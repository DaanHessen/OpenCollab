'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const help_needed = formData.get('help_needed') as string
  const tech_stack_raw = formData.get('tech_stack') as string
  const project_stage = formData.get('project_stage') as string
  const time_commitment = formData.get('time_commitment') as string
  const github_url = formData.get('github_url') as string

  const tech_stack = tech_stack_raw.split(',').map(t => t.trim()).filter(t => t.length > 0)

  const { error } = await supabase.from('posts').insert({
    user_id: user.id,
    title,
    description,
    help_needed,
    tech_stack,
    project_stage,
    time_commitment,
    github_url,
  })

  if (error) {
    console.error('Error creating post:', error)
    return { error: 'Failed to create post' }
  }

  revalidatePath('/feed')
  redirect('/feed')
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const help_needed = formData.get('help_needed') as string
  const tech_stack_raw = formData.get('tech_stack') as string
  const project_stage = formData.get('project_stage') as string
  const time_commitment = formData.get('time_commitment') as string
  const github_url = formData.get('github_url') as string

  const tech_stack = tech_stack_raw.split(',').map(t => t.trim()).filter(t => t.length > 0)

  const { error } = await supabase.from('posts').update({
    title,
    description,
    help_needed,
    tech_stack,
    project_stage,
    time_commitment,
    github_url,
    updated_at: new Date().toISOString(),
  }).eq('id', id).eq('user_id', user.id)

  if (error) {
    console.error('Error updating post:', error)
    return { error: 'Failed to update post' }
  }

  revalidatePath(`/post/${id}`)
  revalidatePath('/feed')
  redirect(`/post/${id}`)
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase.from('posts').delete().eq('id', id).eq('user_id', user.id)

  if (error) {
    console.error('Error deleting post:', error)
    return { error: 'Failed to delete post' }
  }

  revalidatePath('/feed')
  redirect('/feed')
}
