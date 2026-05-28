"use client"

import { useState } from "react"

import MarkdownEditor from "@/components/editor/MarkdownEditor"

export default function EditGuideForm({
  guide,
  tags
}: any) {
  const [title, setTitle] = useState(guide.title)
  const [content, setContent] = useState(guide.content)
  const [published, setPublished] = useState(guide.published)
  const [message, setMessage] = useState("")
  const [selectedTags, setSelectedTags] = useState<number[]>(guide.tags.map((tag: any) => tag.id))

  const handleSubmit = async () => {

    const res = await fetch(
      `/api/admin/guides/${guide.id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title,
          content,
          published,
          tags: selectedTags
        })
      }
    )

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error)
    } else {
      setMessage("Guide updated!")
    }
  }


  return (
    <div className="space-y-6">

      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <MarkdownEditor
        content={content}
        onChange={setContent}
        guideId={guide.id}
      />

      <div className="space-y-2">

      <p className="font-bold">
        Tags
      </p>

      {tags.map((tag: any) => (

        <label
          key={tag.id}
          className="flex items-center gap-2">

          <input
            type="checkbox"

            checked={
              selectedTags.includes(tag.id)
            }

            onChange={(e) => {

              if (e.target.checked) {

                setSelectedTags([
                  ...selectedTags,
                  tag.id
                ])

              } else {

                setSelectedTags(

                  selectedTags.filter(
                    (id) => id !== tag.id
                  )
                )
              }
           }}
          />

          {tag.name}

        </label>

      ))}

      </div>

        

      <label
        className="flex items-center gap-2">
      
        <input
          type="checkbox"

          checked={published}

          onChange={(e) =>
            setPublished(e.target.checked)
          }
        />

        Published

      </label>

      <button onClick={handleSubmit}>
        Save
      </button>

      <p>{message}</p>

    </div>
  )
}