import PostForm from '@/components/post-form'

export default function CreatePostPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Post a Project</h1>
        <p className="mt-2 text-neutral-400">
          Share your open source project and find contributors.
        </p>
      </div>
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 sm:p-8">
        <PostForm />
      </div>
    </div>
  )
}
