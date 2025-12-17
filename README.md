# OpenCollab

The discovery platform for open source projects seeking contributors. No noise. Just code.

## Features

- **Project Posts**: Create structured posts for your open source projects.
- **Discovery Feed**: Browse projects by tech stack, stage, and time commitment.
- **Authentication**: Secure login with Email/Password and Google OAuth via Supabase.
- **Dark Mode**: Built-in dark mode for a developer-friendly experience.

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Icons**: Lucide React

## Getting Started

1.  **Clone the repository**

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables**

    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

The project uses Supabase with the following schema:

- `profiles`: User profiles synced with Supabase Auth.
- `posts`: Project posts containing details like title, description, tech stack, etc.

See `supabase/schema.sql` for the full schema definition and RLS policies.
