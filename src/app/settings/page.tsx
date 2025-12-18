import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from './profile-form'
import { ModeToggle } from '@/components/mode-toggle'
import { ThemeCustomizer } from '@/components/theme-customizer'

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
  const email = user.email || ''

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground mb-8">Settings</h1>
      
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Profile Information</h2>
        <ProfileForm email={email} fullName={fullName} />
      </div>

      <div className="mt-8 bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Appearance</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Theme Preference</p>
              <p className="text-xs text-muted-foreground mt-1">Choose between light and dark mode.</p>
            </div>
            <ModeToggle />
          </div>
          
          <div className="flex items-center justify-between border-t border-border pt-6">
            <div>
              <p className="text-sm font-medium text-foreground">Accent Color</p>
              <p className="text-xs text-muted-foreground mt-1">Customize your primary color.</p>
            </div>
            <ThemeCustomizer />
          </div>
        </div>
      </div>
    </div>
  )
}
