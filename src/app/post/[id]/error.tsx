'use client'

import { useEffect } from 'react'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 border border-dashed border-destructive/50 rounded-xl bg-destructive/5 p-8">
        <div className="p-3 bg-destructive/10 rounded-full">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
          Failed to load project
        </h2>
        <p className="text-muted-foreground max-w-md">
          We couldn't load the project details. It might have been deleted or you might not have permission to view it.
        </p>
        <div className="flex gap-4 pt-2">
          <Link
            href="/feed"
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Feed
          </Link>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
