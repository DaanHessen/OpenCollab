export type Post = {
  id: string
  user_id: string
  title: string
  description: string
  help_needed: string
  tech_stack: string[]
  project_stage: string
  time_commitment: string
  github_url: string
  readme?: string
  github_issues?: any[]
  created_at: string
  updated_at: string
}
