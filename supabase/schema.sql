-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a trigger to sync auth.users with public.profiles
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create posts table
create table posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text not null,
  help_needed text not null,
  tech_stack text[] not null,
  project_stage text not null,
  time_commitment text not null,
  github_url text not null,
  readme text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for posts
alter table posts enable row level security;

create policy "Posts are viewable by everyone." on posts
  for select using (true);

create policy "Users can create their own posts." on posts
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own posts." on posts
  for update using (auth.uid() = user_id);

create policy "Users can delete their own posts." on posts
  for delete using (auth.uid() = user_id);

-- Create tasks table
create table tasks (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  title text not null,
  description text,
  status text not null check (status in ('todo', 'in-progress', 'done')),
  github_issue_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for tasks
alter table tasks enable row level security;

create policy "Tasks are viewable by everyone." on tasks
  for select using (true);

create policy "Post owners can create tasks." on tasks
  for insert with check (
    exists (
      select 1 from posts
      where posts.id = tasks.post_id
      and posts.user_id = auth.uid()
    )
  );

create policy "Post owners can update tasks." on tasks
  for update using (
    exists (
      select 1 from posts
      where posts.id = tasks.post_id
      and posts.user_id = auth.uid()
    )
  );

create policy "Post owners can delete tasks." on tasks
  for delete using (
    exists (
      select 1 from posts
      where posts.id = tasks.post_id
      and posts.user_id = auth.uid()
    )
  );
