import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { updateProfile } from './actions'
import { ModeToggle } from '@/components/mode-toggle'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const fullName = profile?.full_name || user.user_metadata?.full_name || ''
  const email = user.email

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>
      
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Profile Information</h2>
        
        <form action={updateProfile} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={email}
              className="block w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-500 cursor-not-allowed sm:text-sm"
            />
            <p className="mt-1 text-xs text-neutral-600">Email cannot be changed as it is managed by GitHub.</p>
          </div>

          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-neutral-300 mb-1">
              Display Name
            </label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              defaultValue={fullName}
              className="block w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="pt-4 border-t border-neutral-800 flex justify-end">
            <button
              type="submit"
              className="bg-white text-black hover:bg-neutral-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-300">Theme Preference</p>
            <p className="text-xs text-neutral-500 mt-1">Choose between light and dark mode.</p>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
