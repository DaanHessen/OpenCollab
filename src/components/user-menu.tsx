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
        className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors focus:outline-none"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={fullName} className="h-8 w-8 rounded-full border border-neutral-700" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
            <UserIcon className="h-4 w-4" />
          </div>
        )}
        <span className="hidden sm:block max-w-[100px] truncate">{fullName}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-neutral-800 bg-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
          <div className="px-4 py-3 border-b border-neutral-800">
            <p className="text-sm text-white font-medium truncate">{fullName}</p>
            <p className="text-xs text-neutral-500 truncate">{user.email}</p>
          </div>
          
          <div className="py-1">
            <Link
              href="/account"
              className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon className="mr-3 h-4 w-4" />
              My Account
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Link>
          </div>

          <div className="border-t border-neutral-800 py-1">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-neutral-800 hover:text-red-300"
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
