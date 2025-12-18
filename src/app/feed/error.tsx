'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 border border-dashed border-destructive/50 rounded-xl bg-destructive/5 p-8">
        <div className="p-3 bg-destructive/10 rounded-full">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground max-w-md">
          We encountered an error while loading the project feed. This might be due to a connection issue or a temporary glitch.
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
