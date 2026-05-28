"use client"

import { useEffect, useState } from "react"
import ImageUpload from "@/components/ImageUpload"

export default function NewGamePage() {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [genre, setGenre] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const [tags, setTags] = useState<any[]>([])
  const [selectedTags, setSelectedTags] = useState<number[]>([])

  const handleSubmit = async () => {

    if (!title || !genre || !description) {
        setMessage("Fill all fields")
        return
    }

    const res = await fetch("/api/admin/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        genre,
        image,
        description
    })
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error)
    } else {
      setMessage("Game created!")
      setTitle("")
      setGenre("")
      setImage("")
      setDescription("")
    }
  }

  return (
    <div>
      <h1>Add Game</h1>

      <input
        placeholder="Game title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <ImageUpload onUpload={setImage} />

      {image && (
        <img
          src={image}
          alt="Preview"
          width={300}
        />
      )}

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>
        Create
      </button>

      <p>{message}</p>
    </div>
  )
}