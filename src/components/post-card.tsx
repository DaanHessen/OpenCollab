import Link from 'next/link'
import { Post } from '@/types'
import { Clock, GitBranch } from 'lucide-react'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.id}`} className="block group">
      <div className="border border-neutral-800 bg-neutral-900/50 rounded-lg p-6 hover:border-neutral-600 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
            {post.title}
          </h3>
          <span className="text-xs text-neutral-500">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
        <p className="text-neutral-400 mb-6 line-clamp-2">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tech_stack.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-md border border-neutral-700">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-6 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            <span>{post.project_stage}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.time_commitment}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
