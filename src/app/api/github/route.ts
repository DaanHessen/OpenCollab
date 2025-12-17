import { NextResponse } from 'next/server'

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

  try {
    // Fetch repo details
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
    if (!repoRes.ok) {
      throw new Error('Failed to fetch repository details')
    }
    const repoData = await repoRes.json()

    // Fetch README
    const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: {
        Accept: 'application/vnd.github.raw',
      },
    })
    
    let readme = ''
    if (readmeRes.ok) {
      readme = await readmeRes.text()
    }

    // Fetch languages to guess tech stack
    const languagesRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`)
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
