import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ExternalLink, GitBranch, User } from 'lucide-react'
import DeletePostButton from '@/components/delete-post-button'
import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !post) {
    notFound()
  }

  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === post.user_id

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', post.user_id)
    .single()

  const authorName = profile?.full_name || 'Anonymous'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-neutral-400 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          {isOwner && (
            <div className="flex items-center gap-4">
              <Link
                href={`/post/${post.id}/edit`}
                className="text-neutral-400 hover:text-white text-sm font-medium transition-colors"
              >
                Edit
              </Link>
              <DeletePostButton id={post.id} />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-white mb-4">About the Project</h3>
            <p className="text-neutral-300 whitespace-pre-wrap">{post.description}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-white mb-4">Help Needed</h3>
            <p className="text-neutral-300 whitespace-pre-wrap">{post.help_needed}</p>
          </div>

          {post.readme && (
            <div className="prose prose-invert max-w-none border-t border-neutral-800 pt-8">
              <h3 className="text-xl font-semibold text-white mb-4">README</h3>
              <div className="bg-neutral-900/30 rounded-lg p-6 overflow-x-auto">
                <ReactMarkdown>{post.readme}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
            <a
              href={post.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-neutral-200 px-4 py-3 rounded-md text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Repository
            </a>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-neutral-400 mb-2">Project Stage</h4>
              <div className="flex items-center gap-2 text-white">
                <GitBranch className="w-4 h-4" />
                <span>{post.project_stage}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-neutral-400 mb-2">Time Commitment</h4>
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-4 h-4" />
                <span>{post.time_commitment}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-neutral-400 mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {(post.tech_stack as string[]).map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-md border border-neutral-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
