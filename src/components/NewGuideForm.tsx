"use client"

import { useState } from "react"

import GuideEditor from "@/components/editor/MarkdownEditor"

type Props = {
  games: any[]
  tags: any[]
}

export default function NewGuideForm({
  games,
  tags
}: Props) {

  const [title, setTitle] = useState("")

  const [content, setContent] = useState("")

  const [gameId, setGameId] = useState("")

  const [selectedTags, setSelectedTags] = useState<number[]>([])

  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {

    if ( !title || !content || !gameId) {
      setMessage("Fill all fields")
      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        "/api/guides",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            title,
            content,
            gameId: Number(gameId),
            tags: selectedTags
          })
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setMessage(
          data.error ||
          "Something went wrong"
        )
        return
      }

      setMessage(
        "Guide created!"
      )

      setTitle("")
      setContent("")
      setGameId("")
      setSelectedTags([])

    } catch (error) {

      console.error(error)

      setMessage(
        "Failed to create guide"
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="space-y-6">
      <input
        placeholder="Guide title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full p-3 rounded-lg bg-white border border-zinc-800"
      />

      <GuideEditor
        content={content}
        onChange={setContent}
      />

      <select
        value={gameId}
        onChange={(e) =>
          setGameId(e.target.value)
        }
        className="w-full p-3 rounded-lg bg-white border border-zinc-800"
      >

        <option value="">
          Select game
        </option>

        {games.map((game) => (

          <option
            key={game.id}
            value={game.id}
          >
            {game.title}
          </option>

        ))}

      </select>

      <div className="space-y-3">

        <p className="font-bold">
          Tags
        </p>

        <div className="flex flex-wrap gap-3">

          {tags.map((tag) => (

            <label
              key={tag.id}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={
                  selectedTags.includes(
                    tag.id
                  )
                }
                onChange={(e) => {

                  if (
                    e.target.checked
                  ) {

                    setSelectedTags([
                      ...selectedTags,
                      tag.id
                    ])

                  } else {

                    setSelectedTags(

                      selectedTags.filter(
                        (id) =>
                          id !== tag.id
                      )
                    )
                  }
                }}
              />

              {tag.name}

            </label>

          ))}

        </div>

      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/50 font-bold disabled:opacity-50 border border-blue-500">

        {loading ? "Creating..." : "Create Guide"}
      </button>
      {message && (
        <p className="text-sm">
          {message}
        </p>

      )}

    </div>
  )
}