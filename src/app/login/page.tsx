import OAuthButton from '@/components/oauth-button'
import { Code2, Globe, Users } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left Side - Hero/Branding */}
      <div className="hidden lg:flex w-1/2 bg-neutral-900 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-black/50" />
        <div className="relative z-10 max-w-lg px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Build Open Source Together</h1>
          <p className="text-lg text-neutral-400 mb-12">
            Join a community of developers building the future. Find projects, contribute code, and grow your skills.
          </p>
          
          <div className="grid grid-cols-3 gap-8 text-neutral-300">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-neutral-800/50 border border-neutral-700">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Find Projects</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-neutral-800/50 border border-neutral-700">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Collaborate</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-neutral-800/50 border border-neutral-700">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Impact</span>
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 bg-black">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Welcome to OpenCollab
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              Sign in to start your journey.
            </p>
          </div>
          
          <div className="mt-8 space-y-6">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
              <OAuthButton />
              <p className="mt-4 text-xs text-center text-neutral-500">
                By signing in, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
