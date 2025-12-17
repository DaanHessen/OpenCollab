import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PostCard from '@/components/post-card'
import { Post } from '@/types'
import { Mail, Github, Calendar } from 'lucide-react'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user's posts
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch profile (if exists, otherwise use auth metadata)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url
  const fullName = profile?.full_name || user.user_metadata?.full_name || 'Anonymous User'
  const email = profile?.email || user.email

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img 
            src={avatarUrl} 
            alt={fullName} 
            className="w-32 h-32 rounded-full border-4 border-neutral-800 shadow-xl"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">{fullName}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-neutral-400 text-sm mb-6">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex gap-3 justify-center md:justify-start">
              <div className="px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700">
                <span className="block text-2xl font-bold text-white text-center">{posts?.length || 0}</span>
                <span className="text-xs text-neutral-400 uppercase tracking-wider">Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User's Posts */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Github className="w-5 h-5" />
          My Projects
        </h2>
        
        {posts && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post as Post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-neutral-800 rounded-xl bg-neutral-900/30">
            <p className="text-neutral-400 mb-4">You haven't posted any projects yet.</p>
            <a 
              href="/post/create" 
              className="inline-flex items-center px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-neutral-200 transition-colors"
            >
              Post a Project
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
