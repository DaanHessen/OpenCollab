import { createClient } from '@/utils/supabase/server'
import PostCard from '@/components/post-card'
import FeedFilters from '@/components/feed-filters'
import { Post } from '@/types'

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const supabase = await createClient()
  
  let query = supabase.from('posts').select('*').order('created_at', { ascending: false })

  if (resolvedSearchParams.project_stage) {
    query = query.eq('project_stage', resolvedSearchParams.project_stage as string)
  }
  if (resolvedSearchParams.time_commitment) {
    query = query.eq('time_commitment', resolvedSearchParams.time_commitment as string)
  }

  const { data: posts, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-6">Filters</h2>
            <FeedFilters />
          </div>
        </aside>
        <div className="lg:col-span-3 space-y-6">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post as Post} />
          ))}
          {(!posts || posts.length === 0) && (
            <div className="text-center py-12 border border-dashed border-neutral-800 rounded-lg">
              <p className="text-neutral-400">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
