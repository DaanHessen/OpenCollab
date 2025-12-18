import { PostCardSkeleton } from "@/components/post-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeedLoading() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <Skeleton className="h-6 w-24 mb-6" />
            <div className="space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className="lg:col-span-3 space-y-6">
          {[1, 2, 3].map((i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
