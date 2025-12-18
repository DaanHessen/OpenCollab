import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import UserMenu from './user-menu'
import NavLinks from './nav-links'
import MobileNav from './mobile-nav'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50 supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold text-foreground tracking-tight font-[family-name:var(--font-playfair)]">
                OpenCollab
              </span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks user={user} />
            {user ? (
              <div className="ml-2 border-l border-border pl-6">
                <UserMenu user={user} />
              </div>
            ) : (
              <Link href="/login" className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 rounded-full text-sm font-medium transition-all hover:shadow-md hover:scale-105">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="flex md:hidden items-center gap-4">
            {user && <UserMenu user={user} />}
            <MobileNav user={user} />
          </div>
        </div>
      </div>
    </nav>
  )
}
