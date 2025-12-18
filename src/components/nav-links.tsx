'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function NavLinks({ user }: { user: User | null }) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const linkClass = (path: string) => 
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      isActive(path) 
        ? 'text-foreground bg-secondary font-semibold' 
        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
    }`

  return (
    <>
      <Link href="/" className={linkClass('/')}>
        Home
      </Link>
      <Link href="/feed" className={linkClass('/feed')}>
        Explore
      </Link>
      {user && (
        <Link href="/post/create" className={linkClass('/post/create')}>
          Post Project
        </Link>
      )}
    </>
  )
}
