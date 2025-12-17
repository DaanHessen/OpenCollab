import { login, signup } from './actions'
import OAuthButton from '@/components/oauth-button'

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Sign in to your account or create a new one.
          </p>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              formAction={login}
              className="group relative flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
            >
              Sign in
            </button>
            <button
              formAction={signup}
              className="group relative flex w-full justify-center rounded-md border border-neutral-700 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
            >
              Sign up
            </button>
          </div>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-neutral-950 px-2 text-neutral-500">Or continue with</span>
          </div>
        </div>

        <OAuthButton />
      </div>
    </div>
  )
}
