'use client'

import { ExternalLink, AlertCircle, CheckCircle2, Circle } from 'lucide-react'

interface Issue {
  id: number
  number: number
  title: string
  html_url: string
  state: string
  labels: { name: string; color: string }[]
  assignee: { login: string; avatar_url: string } | null
}

export function Planboard({ issues }: { issues: Issue[] }) {
  if (!issues || issues.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
        <p>No open issues found in the linked repository.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {issues.map((issue) => (
        <a
          key={issue.id}
          href={issue.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="font-mono">#{issue.number}</span>
              {issue.state === 'open' ? (
                <span className="flex items-center gap-1 text-green-600 dark:text-green-500">
                  <AlertCircle className="w-3 h-3" />
                  Open
                </span>
              ) : (
                <span className="flex items-center gap-1 text-purple-600 dark:text-purple-500">
                  <CheckCircle2 className="w-3 h-3" />
                  Closed
                </span>
              )}
            </div>
            <ExternalLink className="w-3 h-3 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <h3 className="font-medium text-black dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {issue.title}
          </h3>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-wrap gap-1">
              {issue.labels.slice(0, 3).map((label) => (
                <span
                  key={label.name}
                  className="px-1.5 py-0.5 text-[10px] rounded-full font-medium border"
                  style={{
                    backgroundColor: `#${label.color}20`,
                    borderColor: `#${label.color}40`,
                    color: `#${label.color}`,
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
            
            {issue.assignee && (
              <img
                src={issue.assignee.avatar_url}
                alt={issue.assignee.login}
                className="w-5 h-5 rounded-full border border-neutral-200 dark:border-neutral-700"
                title={`Assigned to ${issue.assignee.login}`}
              />
            )}
          </div>
        </a>
      ))}
    </div>
  )
}
