import OAuthButton from '@/components/oauth-button'
import { Code2, Globe, Users } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md px-4">
        <div className="border border-border bg-card/50 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to OpenCollab to continue your journey.
            </p>
          </div>

          <div className="space-y-6">
            <OAuthButton />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Secure Access
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-medium text-muted-foreground">Find Projects</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-medium text-muted-foreground">Collaborate</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-medium text-muted-foreground">Impact</span>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground px-4 leading-relaxed">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
