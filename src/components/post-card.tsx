import Link from 'next/link'
import { Post } from '@/types'
import { Clock, GitBranch, Users, AlertCircle, ArrowRight } from 'lucide-react'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.id}`} className="block group h-full">
      <div className="border border-border bg-card rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300 h-full flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
              {post.title}
            </h3>
            <span className="text-xs text-muted-foreground mt-1 block">
              Posted {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
            <GitBranch className="w-3 h-3" />
            {post.project_stage}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 line-clamp-2 text-sm leading-relaxed">
          {post.description}
        </p>
        
        {/* Looking For Section - Cleaner Design */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground uppercase tracking-wider">Looking For</span>
          </div>
          <p className="text-sm text-foreground/90 pl-6 border-l-2 border-primary/20">
            {post.help_needed}
          </p>
        </div>

        {/* Active Issues - Minimalist List */}
        {post.github_issues && post.github_issues.length > 0 && (
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Issues</span>
              <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
                {post.github_issues.length}
              </span>
            </div>
            <div className="space-y-1.5">
              {post.github_issues.slice(0, 2).map((issue: any) => (
                <div key={issue.id} className="flex items-start gap-2 text-sm text-muted-foreground group/issue">
                  <AlertCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="truncate group-hover/issue:text-foreground transition-colors">{issue.title}</span>
                </div>
              ))}
              {post.github_issues.length > 2 && (
                <p className="text-xs text-muted-foreground pl-5 hover:text-primary transition-colors">
                  + {post.github_issues.length - 2} more issues
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-border/50 flex flex-col gap-4">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {post.tech_stack.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-0.5 bg-secondary/50 text-secondary-foreground text-[10px] font-medium rounded-md border border-border/50">
                {tech}
              </span>
            ))}
            {post.tech_stack.length > 4 && (
              <span className="px-2 py-0.5 text-muted-foreground text-[10px] font-medium">
                +{post.tech_stack.length - 4}
              </span>
            )}
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.time_commitment}</span>
            </div>
            <span className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
              View Project <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
