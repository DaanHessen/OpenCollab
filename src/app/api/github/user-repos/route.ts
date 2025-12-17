import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const providerToken = session.provider_token
  // Note: provider_token is only available if the session was just established via OAuth
  // or if you are using the 'sb-provider-token' cookie which Supabase sets in some configs.
  // If it's missing, we might need to ask the user to re-authenticate with GitHub.

  if (!providerToken) {
    return NextResponse.json({ error: 'No GitHub token found. Please sign in with GitHub.' }, { status: 401 })
  }

  try {
    const res = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100&type=public', {
      headers: {
        Authorization: `Bearer ${providerToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!res.ok) {
      if (res.status === 401) {
        return NextResponse.json({ error: 'GitHub token expired or invalid' }, { status: 401 })
      }
      throw new Error('Failed to fetch repositories')
    }

    const repos = await res.json()
    return NextResponse.json(repos)
  } catch (error) {
    console.error('Error fetching user repos:', error)
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 })
  }
}
