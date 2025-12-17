'use client'

import { createPost, updatePost } from '@/app/post/actions'
import { Post } from '@/types'

export default function PostForm({ post }: { post?: Post }) {
  const action = post ? updatePost.bind(null, post.id) : createPost

  const handleSubmit = async (formData: FormData) => {
    const result = await action(formData)
    if (result && 'error' in result) {
      alert(result.error)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-neutral-300">Project Name</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={post?.title}
          required
          className="mt-1 block w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-300">Short Description (max 300 chars)</label>
        <textarea
          name="description"
          id="description"
          rows={3}
          maxLength={300}
          defaultValue={post?.description}
          required
          className="mt-1 block w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="help_needed" className="block text-sm font-medium text-neutral-300">What help is needed?</label>
        <textarea
          name="help_needed"
          id="help_needed"
          rows={5}
          defaultValue={post?.help_needed}
          required
          className="mt-1 block w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="tech_stack" className="block text-sm font-medium text-neutral-300">Tech Stack (comma separated)</label>
        <input
          type="text"
          name="tech_stack"
          id="tech_stack"
          defaultValue={post?.tech_stack.join(', ')}
          placeholder="React, TypeScript, Tailwind"
          required
          className="mt-1 block w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="project_stage" className="block text-sm font-medium text-neutral-300">Project Stage</label>
          <select
            name="project_stage"
            id="project_stage"
            defaultValue={post?.project_stage}
            required
            className="mt-1 block w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="Idea">Idea</option>
            <option value="Prototype">Prototype</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label htmlFor="time_commitment" className="block text-sm font-medium text-neutral-300">Time Commitment</label>
          <select
            name="time_commitment"
            id="time_commitment"
            defaultValue={post?.time_commitment}
            required
            className="mt-1 block w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="One-off">One-off</option>
            <option value="Few hours">Few hours</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="github_url" className="block text-sm font-medium text-neutral-300">GitHub Repository URL</label>
        <input
          type="url"
          name="github_url"
          id="github_url"
          defaultValue={post?.github_url}
          required
          className="mt-1 block w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          {post ? 'Update Project' : 'Post Project'}
        </button>
      </div>
    </form>
  )
}
