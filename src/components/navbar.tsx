import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-white tracking-tight">
              OpenCollab
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/feed" className="text-neutral-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Explore
            </Link>
            {user ? (
              <>
                <Link href="/post/create" className="text-neutral-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Post Project
                </Link>
                <form action="/auth/signout" method="post">
                  <button className="text-neutral-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <Link href="/login" className="bg-white text-black hover:bg-neutral-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
