import Link from "next/link";
import { ArrowRight, Code, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center flex-grow">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 font-[family-name:var(--font-playfair)]">
          Build Together.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          The discovery platform for open source projects seeking contributors.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/feed"
            className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 rounded-md text-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            Explore Projects <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/post/create"
            className="border border-input text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-md text-lg font-medium transition-colors"
          >
            Post a Project
          </Link>
        </div>
      </section>
    </div>
  );
}
