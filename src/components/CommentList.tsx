"use client"

import { useEffect, useState } from "react"

type Comment = {
  id: number
  content: string
  authorName?: string
  author?: {
    email: string
  }
}

export default function CommentList({ guideId }: { guideId: number }) {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    fetch(`/api/comments?guideId=${guideId}`)
      .then(res => res.json())
      .then(setComments)
  }, [guideId])

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Comments</h3>

      {comments.length === 0 && <p>No comments yet</p>}

      {comments.map((c) => (
        <div key={c.id} style={{ marginBottom: 10 }}>
          <strong>
            {c.author?.email || c.authorName || "Anonymous"}
          </strong>
          <p>{c.content}</p>
        </div>
      ))}
    </div>
  )
}