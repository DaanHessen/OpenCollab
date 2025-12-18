import { Skeleton } from "@/components/ui/skeleton"

export function PostCardSkeleton() {
  return (
    <div className="border border-border bg-card rounded-xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Description */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      
      {/* Looking For Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="pl-6 border-l-2 border-muted">
          <Skeleton className="h-4 w-full" />
        </div>
      </div>

      {/* Active Issues */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-6 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-border/50 flex flex-col gap-4">
        {/* Tech Stack */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}
