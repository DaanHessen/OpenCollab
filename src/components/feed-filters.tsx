'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function FeedFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/feed?${params.toString()}`)
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-white mb-3">Project Stage</h3>
        <div className="space-y-2">
          {['Idea', 'Prototype', 'Active', 'Maintenance'].map((stage) => (
            <label key={stage} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                name="stage"
                checked={searchParams.get('project_stage') === stage}
                onChange={() => updateFilter('project_stage', stage)}
                className="appearance-none w-4 h-4 rounded-full border border-neutral-700 checked:bg-white checked:border-white transition-colors cursor-pointer"
              />
              <span className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">{stage}</span>
            </label>
          ))}
          {searchParams.get('project_stage') && (
            <button
              onClick={() => updateFilter('project_stage', null)}
              className="text-xs text-neutral-500 hover:text-white mt-2 block"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-3">Time Commitment</h3>
        <div className="space-y-2">
          {['One-off', 'Few hours', 'Ongoing'].map((time) => (
            <label key={time} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                name="time"
                checked={searchParams.get('time_commitment') === time}
                onChange={() => updateFilter('time_commitment', time)}
                className="appearance-none w-4 h-4 rounded-full border border-neutral-700 checked:bg-white checked:border-white transition-colors cursor-pointer"
              />
              <span className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">{time}</span>
            </label>
          ))}
          {searchParams.get('time_commitment') && (
            <button
              onClick={() => updateFilter('time_commitment', null)}
              className="text-xs text-neutral-500 hover:text-white mt-2 block"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
