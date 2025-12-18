import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ExternalLink, GitBranch, User, FolderGit2 } from 'lucide-react'
import DeletePostButton from '@/components/delete-post-button'
import { Post } from '@/types'
import { MarkdownViewer } from '@/components/markdown-viewer'
import CommentSection from '@/components/comment-section'
import { Planboard } from '@/components/planboard'
import { fetchRepoIssues } from '../actions'

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

  const issues = await fetchRepoIssues(post.github_url)

  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === post.user_id

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', post.user_id)
    .single()

  // Fetch user metrics (project count)
  const { count: projectCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', post.user_id)

  const authorName = profile?.full_name || 'Anonymous'
  const authorAvatar = profile?.avatar_url

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-neutral-600 dark:text-neutral-400 text-sm">
              <div className="flex items-center gap-2 group relative">
                {authorAvatar ? (
                  <img src={authorAvatar} alt={authorName} className="w-6 h-6 rounded-full" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span className="font-medium text-black dark:text-white">{authorName}</span>
                
                {/* User Metrics Tooltip */}
                <div className="absolute left-0 top-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 w-48 pointer-events-none">
                  <p className="text-xs font-semibold text-neutral-500 uppercase mb-2">Contributor Stats</p>
                  <div className="flex items-center gap-2 text-black dark:text-white">
                    <FolderGit2 className="w-4 h-4 text-primary" />
                    <span>{projectCount || 0} Projects Posted</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {isOwner && (
              <>
                <Link
                  href={`/post/${post.id}/edit`}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Edit
                </Link>
                <DeletePostButton id={post.id} />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-4">About the Project</h2>
            <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {post.description}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-4">Help Needed</h2>
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-lg p-6 mb-6">
              <p className="text-primary dark:text-primary-foreground whitespace-pre-wrap">
                {post.help_needed}
              </p>
            </div>
            
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Open Issues</h3>
            <Planboard issues={issues} />
          </section>

          {post.readme && (
            <section>
              <h2 className="text-xl font-bold text-black dark:text-white mb-4">README</h2>
              <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <MarkdownViewer content={post.readme} className="p-6" />
              </div>
            </section>
          )}
          
          <CommentSection postId={post.id} user={user} />
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
            <h3 className="font-semibold text-black dark:text-white mb-4">Project Details</h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-xs font-medium text-neutral-500 uppercase">Tech Stack</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tech_stack.map((tech: string) => (
                    <span key={tech} className="px-2 py-1 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded-md border border-neutral-200 dark:border-neutral-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-neutral-500 uppercase">Stage</span>
                <div className="flex items-center gap-2 mt-1 text-black dark:text-white">
                  <GitBranch className="w-4 h-4" />
                  <span>{post.project_stage}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-neutral-500 uppercase">Time Commitment</span>
                <div className="flex items-center gap-2 mt-1 text-black dark:text-white">
                  <Clock className="w-4 h-4" />
                  <span>{post.time_commitment}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <a
                href={post.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
