'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { Loader2, Send, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Comment {
  id: string
  content: string
  created_at: string
  user_id: string
  profiles: {
    full_name: string
    avatar_url: string
  }
}

export default function CommentSection({ postId, user }: { postId: string, user: User | null }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (!error && data) {
      setComments(data as any)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchComments()
    
    // Realtime subscription
    const channel = supabase
      .channel('comments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments', filter: `post_id=eq.${postId}` }, () => {
        fetchComments()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return router.push('/login')
    if (!newComment.trim()) return

    setIsSubmitting(true)
    const { error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        content: newComment.trim()
      })

    if (!error) {
      setNewComment('')
    }
    setIsSubmitting(false)
  }

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return
    await supabase.from('comments').delete().eq('id', commentId)
  }

  if (isLoading) return <div className="py-8 text-center text-neutral-500">Loading comments...</div>

  return (
    <div className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-8">
      <h3 className="text-xl font-bold text-black dark:text-white mb-6">Comments ({comments.length})</h3>

      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <img 
              src={comment.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${comment.profiles?.full_name || 'Anonymous'}`} 
              alt={comment.profiles?.full_name} 
              className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700"
            />
            <div className="flex-1">
              <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-black dark:text-white text-sm">
                    {comment.profiles?.full_name || 'Anonymous'}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm whitespace-pre-wrap">{comment.content}</p>
              </div>
              {user?.id === comment.user_id && (
                <button 
                  onClick={() => handleDelete(comment.id)}
                  className="text-xs text-red-500 hover:text-red-400 mt-1 ml-2 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-neutral-500 text-center py-4">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-4">
          <img 
            src={user.user_metadata.avatar_url} 
            alt="My Avatar" 
            className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700"
          />
          <div className="flex-1 relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 text-black dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[100px] resize-y"
            />
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg p-6 text-center">
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">Sign in to join the discussion.</p>
          <a href="/login" className="inline-block px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium hover:opacity-90 transition-opacity">
            Sign In
          </a>
        </div>
      )}
    </div>
  )
}
