'use client'

import { createClient } from '@/utils/supabase/client'
import { Github } from 'lucide-react'

export default function OAuthButton() {
  const handleLogin = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        scopes: 'public_repo',
      },
    })
  }

  return (
    <button
      onClick={handleLogin}
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
    >
      <Github className="h-4 w-4" />
      Sign in with GitHub
    </button>
  )
}
