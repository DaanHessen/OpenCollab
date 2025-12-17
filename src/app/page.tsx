import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
        Build Together.
      </h1>
      <p className="text-xl text-neutral-400 max-w-2xl mb-10">
        The discovery platform for open source projects seeking contributors.
        No noise. Just code.
      </p>
      <div className="flex gap-4">
        <Link
          href="/feed"
          className="bg-white text-black hover:bg-neutral-200 px-8 py-3 rounded-md text-lg font-medium transition-colors"
        >
          Explore Projects
        </Link>
        <Link
          href="/post/create"
          className="border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 px-8 py-3 rounded-md text-lg font-medium transition-colors"
        >
          Post a Project
        </Link>
      </div>
    </div>
  );
}
