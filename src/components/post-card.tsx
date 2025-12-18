import Link from 'next/link'
import { Post } from '@/types'
import { Clock, GitBranch, Users, AlertCircle, ArrowRight, Star } from 'lucide-react'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.id}`} className="block group h-full">
      <div className="relative h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
        
        {/* Gradient Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Header */}
        <div className="relative flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight line-clamp-1">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Posted {new Date(post.created_at).toLocaleDateString()}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" /> 0 stars
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground uppercase tracking-wider border border-border/50">
            <GitBranch className="w-3 h-3" />
            {post.project_stage}
          </div>
        </div>

        {/* Description */}
        <p className="relative text-muted-foreground mb-6 line-clamp-2 text-sm leading-relaxed">
          {post.description}
        </p>
        
        {/* Looking For Section */}
        <div className="relative mb-6 bg-secondary/30 rounded-lg p-3 border border-border/50">
          <div className="flex items-center gap-2 mb-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">Looking For</span>
          </div>
          <p className="text-sm text-foreground/90">
            {post.help_needed}
          </p>
        </div>

        {/* Active Issues */}
        {post.github_issues && post.github_issues.length > 0 && (
          <div className="relative mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Active Issues</span>
              <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full font-mono">
                {post.github_issues.length}
              </span>
            </div>
            <div className="space-y-2">
              {post.github_issues.slice(0, 2).map((issue: any) => (
                <div key={issue.id} className="flex items-start gap-2 text-sm text-muted-foreground group/issue hover:bg-secondary/50 p-1.5 -mx-1.5 rounded-md transition-colors">
                  <AlertCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="truncate group-hover/issue:text-foreground transition-colors">{issue.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative mt-auto pt-4 border-t border-border/50 flex flex-col gap-4">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {post.tech_stack.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-1 bg-background text-muted-foreground text-[10px] font-medium rounded-md border border-border shadow-sm">
                {tech}
              </span>
            ))}
            {post.tech_stack.length > 4 && (
              <span className="px-2 py-1 text-muted-foreground text-[10px] font-medium">
                +{post.tech_stack.length - 4}
              </span>
            )}
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.time_commitment}</span>
            </div>
            <span className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              View Project <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
