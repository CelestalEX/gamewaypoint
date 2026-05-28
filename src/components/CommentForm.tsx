"use client"

import { useState } from "react"

export default function CommentForm({ guideId }: { guideId: number }) {
  const [content, setContent] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content,
        guideId,
        authorName: name
      })
    })

    const data = await res.json()

    if (!res.ok) {
      // 🔴 obsługa błędów z Zod
      if (data.errors) {
        setError(data.errors.map((e: any) => e.message).join(", "))
      } else {
        setError(data.error || "Something went wrong")
      }
    } else {
      setContent("")
      setName("")
    }

    setLoading(false)
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Add comment</h3>

      <input
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Write your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Submit"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}