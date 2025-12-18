import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
                OpenCollab
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              The discovery platform for open source projects seeking contributors.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Platform</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/feed" className="text-sm text-muted-foreground hover:text-primary transition-colors">Explore</Link></li>
              <li><Link href="/post/create" className="text-sm text-muted-foreground hover:text-primary transition-colors">Post a Project</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Connect</h3>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/DaanHessen/OpenCollab" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} OpenCollab. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with <span className="text-red-500 animate-pulse">♥</span> by Daan Hessen
          </p>
        </div>
      </div>
    </footer>
  )
}
