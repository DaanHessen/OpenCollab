'use client'

import { useActionState } from 'react'
import { updateProfile } from './actions'
import { Loader2 } from 'lucide-react'

const initialState = {
  message: '',
  error: '',
}

export function ProfileForm({ 
  email, 
  fullName 
}: { 
  email: string
  fullName: string 
}) {
  const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    const result = await updateProfile(formData);
    if (result.error) {
      return { error: result.error, message: '' };
    }
    return { message: result.success, error: '' };
  }, initialState)

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-1">
          Email Address
        </label>
        <input
          type="email"
          disabled
          value={email}
          className="block w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 px-3 py-2 text-neutral-500 cursor-not-allowed sm:text-sm"
        />
        <p className="mt-1 text-xs text-neutral-600">Email cannot be changed as it is managed by GitHub.</p>
      </div>

      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Display Name
        </label>
        <input
          type="text"
          name="full_name"
          id="full_name"
          defaultValue={fullName}
          className="block w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-black dark:text-white px-3 py-2 focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="Your name"
        />
      </div>

      {state?.error && (
        <div className="text-red-500 text-sm">{state.error}</div>
      )}
      
      {state?.message && (
        <div className="text-green-500 text-sm">{state.message}</div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex justify-center items-center w-full rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  )
}
