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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground font-[family-name:var(--font-playfair)]">Filters</h2>
            </div>
            <FeedFilters />
          </div>
        </aside>
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-2">Explore Projects</h1>
            <p className="text-muted-foreground">Discover the latest open source opportunities.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts?.map((post) => (
              <PostCard key={post.id} post={post as Post} />
            ))}
          </div>
          {(!posts || posts.length === 0) && (
            <div className="text-center py-20 border border-dashed border-border rounded-xl bg-card/50 mt-6">
              <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
              <button className="mt-4 text-primary hover:underline text-sm">Clear all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
