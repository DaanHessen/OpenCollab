import { createClient } from '@/utils/supabase/server'
import PostForm from '@/components/post-form'
import { redirect } from 'next/navigation'
import { Post } from '@/types'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !post) {
    redirect('/feed')
  }

  if (post.user_id !== user.id) {
    redirect('/feed')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Edit Project</h1>
      </div>
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 sm:p-8">
        <PostForm post={post as Post} />
      </div>
    </div>
  )
}
