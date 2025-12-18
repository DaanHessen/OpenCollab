import Link from "next/link";
import { ArrowRight, Code, Users, Zap, GitBranch, Star, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-32 px-4 text-center overflow-hidden flex-grow">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background -z-10" />
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6 font-[family-name:var(--font-playfair)] max-w-4xl mx-auto leading-[1.1]">
          Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">Together.</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mb-10 mx-auto leading-relaxed">
          The discovery platform for open source projects seeking contributors.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          <Link
            href="/feed"
            className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-foreground/10"
          >
            Explore Projects <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/post/create"
            className="w-full sm:w-auto border border-input bg-background/50 backdrop-blur-sm text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105"
          >
            Post a Project
          </Link>
        </div>
      </section>
    </div>
  );
}
