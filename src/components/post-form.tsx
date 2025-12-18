'use client'

import { createPost, updatePost } from '@/app/post/actions'
import { Post } from '@/types'
import { useState } from 'react'
import { Loader2, CheckSquare, Square, RefreshCw, Info } from 'lucide-react'
import RepoSelector from './repo-selector'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export default function PostForm({ post }: { post?: Post }) {
  const action = post ? updatePost.bind(null, post.id) : createPost
  const [isLoading, setIsLoading] = useState(false)
  const [githubUrl, setGithubUrl] = useState(post?.github_url || '')
  const [issues, setIssues] = useState<any[]>([])
  const [selectedIssues, setSelectedIssues] = useState<any[]>(post?.github_issues || [])
  const [isLoadingIssues, setIsLoadingIssues] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    try {
      // Append selected issues to formData
      formData.append('github_issues', JSON.stringify(selectedIssues))
      
      const result = await action(formData)
      if (result && 'error' in result) {
        toast.error(result.error)
      } else {
        toast.success(post ? 'Project updated successfully' : 'Project posted successfully')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchIssues = async (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/)
    if (!match) return

    const [, owner, repo] = match
    setIsLoadingIssues(true)
    try {
      const res = await fetch(`/api/github/repo-issues?owner=${owner}&repo=${repo}`)
      if (res.ok) {
        const data = await res.json()
        setIssues(data)
      }
    } catch (error) {
      console.error('Failed to fetch issues', error)
      toast.error('Failed to fetch issues')
    } finally {
      setIsLoadingIssues(false)
    }
  }

  const toggleIssue = (issue: any) => {
    if (selectedIssues.find(i => i.id === issue.id)) {
      setSelectedIssues(selectedIssues.filter(i => i.id !== issue.id))
    } else {
      setSelectedIssues([...selectedIssues, issue])
    }
  }

  const handleRepoSelect = async (repo: any) => {
    setGithubUrl(repo.html_url)
    
    const titleInput = document.getElementById('title') as HTMLInputElement
    const descriptionInput = document.getElementById('description') as HTMLTextAreaElement
    
    if (titleInput) titleInput.value = repo.name || ''
    if (descriptionInput) descriptionInput.value = repo.description || ''

    // Fetch issues for the selected repo
    fetchIssues(repo.html_url)

    const promise = fetch(`/api/github?url=${encodeURIComponent(repo.html_url)}`)
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to fetch GitHub data')
        return data
      })
      .then((data) => {
        const techStackInput = document.getElementById('tech_stack') as HTMLInputElement
        const readmeInput = document.getElementById('readme') as HTMLInputElement

        if (techStackInput) techStackInput.value = data.tech_stack.join(', ') || ''
        if (readmeInput) readmeInput.value = data.readme || ''
        return data
      })

    toast.promise(promise, {
      loading: 'Fetching repository details...',
      success: 'Repository details loaded',
      error: 'Failed to fetch repository details'
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="readme" id="readme" defaultValue={post?.readme} />
      <input type="hidden" name="github_url" value={githubUrl} />
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Post a Project</h1>
          <p className="text-sm text-muted-foreground">Share your open source project and find contributors.</p>
        </div>
        <div className="flex items-center gap-3">
           <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                post ? 'Update Project' : 'Post Project'
              )}
            </button>
        </div>
      </div>

      {/* Control Bar: Repo & Settings */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
         <div className="lg:col-span-6">
            <label className="block text-sm font-medium text-foreground mb-1.5">Repository</label>
            <RepoSelector onSelect={handleRepoSelect} selectedRepoUrl={githubUrl} />
         </div>
         <div className="lg:col-span-3">
            <label htmlFor="project_stage" className="block text-sm font-medium text-foreground mb-1.5">Stage</label>
            <select
              name="project_stage"
              id="project_stage"
              defaultValue={post?.project_stage || 'Idea'}
              className="block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-primary sm:text-sm transition-colors"
            >
              <option value="Idea">Idea</option>
              <option value="Prototype">Prototype</option>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
            </select>
         </div>
         <div className="lg:col-span-3">
            <label htmlFor="time_commitment" className="block text-sm font-medium text-foreground mb-1.5">Commitment</label>
            <select
              name="time_commitment"
              id="time_commitment"
              defaultValue={post?.time_commitment || 'Flexible'}
              className="block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-primary sm:text-sm transition-colors"
            >
              <option value="One-off">One-off</option>
              <option value="Few hours">Part-time</option>
              <option value="Ongoing">Ongoing</option>
            </select>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Main Content (2 cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-base font-semibold mb-1">Project Details</h3>
            
            <div className="grid grid-cols-1 gap-4">
               <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1.5">Project Name</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={post?.title}
                  required
                  className="block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                  placeholder="e.g. OpenCollab"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1.5">
                  Short Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={2}
                  maxLength={300}
                  defaultValue={post?.description}
                  required
                  className="block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-primary sm:text-sm transition-colors resize-none"
                  placeholder="Briefly describe your project..."
                />
              </div>

              <div>
                 <label htmlFor="tech_stack" className="block text-sm font-medium text-foreground mb-1.5">
                    Tech Stack <span className="text-muted-foreground font-normal">(comma separated)</span>
                  </label>
                  <input
                    type="text"
                    name="tech_stack"
                    id="tech_stack"
                    defaultValue={post?.tech_stack?.join(', ')}
                    required
                    className="block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                    placeholder="React, TypeScript, Tailwind..."
                  />
               </div>

               <div>
                <label htmlFor="help_needed" className="block text-sm font-medium text-foreground mb-1.5">What help is needed?</label>
                <textarea
                  name="help_needed"
                  id="help_needed"
                  rows={6}
                  defaultValue={post?.help_needed}
                  required
                  className="block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                  placeholder="Describe the specific help you are looking for..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Issues (1 col wide) */}
        <div className="space-y-6">
          {/* Issues */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col h-full min-h-[500px]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold">Link Issues</h3>
              {githubUrl && (
                <button 
                  type="button" 
                  onClick={() => fetchIssues(githubUrl)}
                  className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                >
                  <RefreshCw className="h-3 w-3" /> Refresh
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar -mr-2 pr-2">
               {!githubUrl ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center p-4 border border-dashed border-border rounded-lg bg-muted/30">
                    <Info className="h-6 w-6 mb-2 opacity-50" />
                    <p className="text-xs">Select a repository to link issues.</p>
                  </div>
                ) : isLoadingIssues ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-4 w-4 rounded" />
                        <div className="space-y-1 flex-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : issues.length > 0 ? (
                  <div className="space-y-2">
                    {issues.map(issue => {
                      const isSelected = selectedIssues.some(i => i.id === issue.id)
                      return (
                        <div 
                          key={issue.id}
                          onClick={() => toggleIssue(issue)}
                          className={`flex items-start gap-3 p-2.5 rounded-md cursor-pointer transition-all border ${
                            isSelected 
                              ? 'bg-primary/5 border-primary/20' 
                              : 'hover:bg-accent border-transparent hover:border-border'
                          }`}
                        >
                          {isSelected ? (
                            <CheckSquare className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          ) : (
                            <Square className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p className={`text-sm font-medium truncate ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {issue.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-muted-foreground font-mono">#{issue.number}</span>
                              {issue.labels.slice(0, 2).map((label: any) => (
                                <span 
                                  key={label.id} 
                                  className="text-[10px] px-1.5 py-0 rounded-full border truncate max-w-[100px]"
                                  style={{ 
                                    backgroundColor: `#${label.color}10`, 
                                    color: `#${label.color}`,
                                    borderColor: `#${label.color}30`
                                  }}
                                >
                                  {label.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center p-4 border border-dashed border-border rounded-lg bg-muted/30">
                    <p className="text-xs">No open issues found.</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
