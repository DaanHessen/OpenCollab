import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  // Extract owner and repo from URL
  // Expected format: https://github.com/owner/repo
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/)
  if (!match) {
    return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 })
  }

  const [, owner, repo] = match

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session?.provider_token) {
    headers['Authorization'] = `Bearer ${session.provider_token}`
  } else if (process.env.GITHUB_ACCESS_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
  }

  try {
    // Fetch repo details
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
    
    if (!repoRes.ok) {
      if (repoRes.status === 403 || repoRes.status === 429) {
        throw new Error('GitHub API rate limit exceeded. Please try again later or add a GITHUB_ACCESS_TOKEN.')
      }
      if (repoRes.status === 404) {
        throw new Error('Repository not found. Please check the URL.')
      }
      throw new Error('Failed to fetch repository details')
    }
    const repoData = await repoRes.json()

    // Fetch README
    const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: {
        ...headers,
        Accept: 'application/vnd.github.raw',
      },
    })
    
    let readme = ''
    if (readmeRes.ok) {
      readme = await readmeRes.text()
    }

    // Fetch languages to guess tech stack
    const languagesRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers })
    let tech_stack: string[] = []
    if (languagesRes.ok) {
      const languagesData = await languagesRes.json()
      tech_stack = Object.keys(languagesData).slice(0, 5) // Top 5 languages
    }

    return NextResponse.json({
      title: repoData.name,
      description: repoData.description,
      tech_stack,
      readme,
    })
  } catch (error) {
    console.error('GitHub API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch data from GitHub' }, { status: 500 })
  }
}
