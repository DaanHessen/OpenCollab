import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import UserMenu from './user-menu'
import NavLinks from './nav-links'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-foreground tracking-tight font-[family-name:var(--font-playfair)]">
              OpenCollab
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <NavLinks user={user} />
            {user ? (
              <div className="ml-2 border-l border-border pl-4">
                <UserMenu user={user} />
              </div>
            ) : (
              <Link href="/login" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
