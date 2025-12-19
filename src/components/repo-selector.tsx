'use client'

import { createClient } from '@/utils/supabase/client'
import { getURL } from '@/lib/utils'
import { Github, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface Repo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  language: string
}

interface RepoSelectorProps {
  onSelect: (repo: Repo) => void
  selectedRepoUrl?: string
}

export default function RepoSelector({ onSelect, selectedRepoUrl }: RepoSelectorProps) {
  const [repos, setRepos] = useState<Repo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [needsAuth, setNeedsAuth] = useState(false)

  const fetchRepos = async () => {
    setIsLoading(true)
    setError(null)
    setNeedsAuth(false)
    try {
      const res = await fetch('/api/github/user-repos')
      if (res.status === 401) {
        setNeedsAuth(true)
        return
      }
      if (!res.ok) throw new Error('Failed to fetch repositories')
      const data = await res.json()
      setRepos(data)
    } catch (err) {
      console.error(err)
      setError('Failed to load repositories')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRepos()
  }, [])

  const handleConnect = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${getURL()}auth/callback`,
        scopes: 'public_repo',
      },
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (needsAuth) {
    return (
      <button
        type="button"
        onClick={handleConnect}
        className="w-full flex items-center justify-between gap-3 rounded-md border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-sm text-primary hover:bg-primary/10 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Github className="h-4 w-4" />
          Connect GitHub Repository
        </span>
        <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded">Connect</span>
      </button>
    )
  }

  if (error) {
    return (
      <div className="text-destructive text-sm flex items-center gap-2">
        {error}
        <button type="button" onClick={fetchRepos} className="text-muted-foreground hover:text-foreground"><RefreshCw className="h-4 w-4" /></button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">Select Repository</label>
      <div className="flex gap-2">
        <select
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-primary sm:text-sm"
          onChange={(e) => {
            const repo = repos.find(r => r.html_url === e.target.value)
            if (repo) onSelect(repo)
          }}
          value={selectedRepoUrl || ''}
        >
          <option value="">Select a repository...</option>
          {repos.map((repo) => (
            <option key={repo.id} value={repo.html_url}>
              {repo.full_name}
            </option>
          ))}
        </select>
        <button 
          type="button" 
          onClick={fetchRepos} 
          className="p-2 text-muted-foreground hover:text-foreground border border-input rounded-md hover:bg-accent"
          title="Refresh Repositories"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
