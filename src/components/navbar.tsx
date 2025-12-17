import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import UserMenu from './user-menu'
import { ModeToggle } from './mode-toggle'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-black dark:text-white tracking-tight">
              OpenCollab
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/feed" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Explore
            </Link>
            {user ? (
              <>
                <Link href="/post/create" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Post Project
                </Link>
                <div className="ml-2 border-l border-neutral-200 dark:border-neutral-800 pl-4">
                  <UserMenu user={user} />
                </div>
              </>
            ) : (
              <Link href="/login" className="bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
