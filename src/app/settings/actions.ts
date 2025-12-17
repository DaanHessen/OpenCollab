'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const full_name = formData.get('full_name') as string
  
  // We can add more fields here later if we expand the profiles table
  // e.g. bio, website, etc.

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      full_name,
      updated_at: new Date().toISOString(),
    })

  if (error) {
    return { error: 'Failed to update profile' }
  }

  revalidatePath('/account')
  revalidatePath('/settings')
  return { success: 'Profile updated successfully' }
}
