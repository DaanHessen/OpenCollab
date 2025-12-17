'use client'

import { deletePost } from '@/app/post/actions'

export default function DeletePostButton({ id }: { id: string }) {
  return (
    <button
      onClick={() => {
        if (confirm('Are you sure you want to delete this project?')) {
          deletePost(id)
        }
      }}
      className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
    >
      Delete
    </button>
  )
}
