'use client'

import { User } from '@supabase/supabase-js'
import { LogOut, Settings, User as UserIcon, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function UserMenu({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // Get avatar from metadata or use default
  const avatarUrl = user.user_metadata?.avatar_url
  const fullName = user.user_metadata?.full_name || user.email

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={fullName} className="h-8 w-8 rounded-full border border-border" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        <span className="hidden sm:block max-w-[100px] truncate">{fullName}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium truncate">{fullName}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          
          <div className="py-1">
            <Link
              href="/account"
              className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon className="mr-3 h-4 w-4" />
              My Account
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Link>
          </div>

          <div className="border-t border-border py-1">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center px-4 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
