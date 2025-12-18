import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const owner = searchParams.get('owner')
  const repo = searchParams.get('repo')

  if (!owner || !repo) {
    return NextResponse.json({ error: 'Owner and repo are required' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const providerToken = session.provider_token

  if (!providerToken) {
    return NextResponse.json({ error: 'No GitHub token found. Please sign in with GitHub.' }, { status: 401 })
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=100`, {
      headers: {
        Authorization: `Bearer ${providerToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!res.ok) {
      if (res.status === 401) {
        return NextResponse.json({ error: 'GitHub token expired or invalid' }, { status: 401 })
      }
      throw new Error('Failed to fetch issues')
    }

    const issues = await res.json()
    // Filter out pull requests, as they are also returned by the issues endpoint
    const onlyIssues = issues.filter((issue: any) => !issue.pull_request)
    
    return NextResponse.json(onlyIssues)
  } catch (error) {
    console.error('Error fetching repo issues:', error)
    return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 })
  }
}
