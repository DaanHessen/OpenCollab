'use client'

import { createClient } from '@/utils/supabase/client'
import { Github, Loader2, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'

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
        redirectTo: `${location.origin}/auth/callback`,
        scopes: 'public_repo',
      },
    })
  }

  if (isLoading) {
    return <div className="flex items-center gap-2 text-neutral-400"><Loader2 className="h-4 w-4 animate-spin" /> Loading repositories...</div>
  }

  if (needsAuth) {
    // This should theoretically not happen if we enforce GitHub login, but good to keep as fallback
    return (
      <div className="rounded-md border border-neutral-800 bg-neutral-900 p-4">
        <h3 className="mb-2 text-sm font-medium text-white">GitHub Access Required</h3>
        <p className="mb-4 text-xs text-neutral-400">Please sign in with GitHub to access your repositories.</p>
        <button
          type="button"
          onClick={handleConnect}
          className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-neutral-200"
        >
          <Github className="h-4 w-4" />
          Sign in with GitHub
        </button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-400 text-sm flex items-center gap-2">
        {error}
        <button type="button" onClick={fetchRepos} className="text-neutral-400 hover:text-white"><RefreshCw className="h-4 w-4" /></button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-300">Select Repository</label>
      <select
        className="block w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        onChange={(e) => {
          const repo = repos.find(r => r.html_url === e.target.value)
          if (repo) onSelect(repo)
        }}
        value={selectedRepoUrl || ''}
      >
        <option value="">-- Select a repository --</option>
        {repos.map((repo) => (
          <option key={repo.id} value={repo.html_url}>
            {repo.full_name}
          </option>
        ))}
      </select>
      <div className="flex justify-end">
         <button type="button" onClick={fetchRepos} className="text-xs text-neutral-500 hover:text-neutral-300 flex items-center gap-1">
            <RefreshCw className="h-3 w-3" /> Refresh List
         </button>
      </div>
    </div>
  )
}
