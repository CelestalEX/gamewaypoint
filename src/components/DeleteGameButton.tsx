"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DeleteGameButton({
  id
}: {
  id: number
}) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    const confirmed = confirm(
      "Delete this game?"
    )

    if (!confirmed) return

    setLoading(true)

    const res = await fetch(
      `/api/admin/games/${id}`,
      {
        method: "DELETE"
      }
    )

    if (res.ok) {
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  )
}