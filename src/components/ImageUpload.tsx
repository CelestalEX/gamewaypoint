"use client"

import { supabase } from "@/lib/supabase"
import { useState } from "react"

type Props = {
  onUpload: (url: string) => void
}

export default function ImageUpload({
  onUpload
}: Props) {
  console.log("UPLOAD STARED")
  const [loading, setLoading] = useState(false)

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
        console.log("UPLOAD STARTED")

        const file = e.target.files?.[0]

        console.log("FILE:", file)

        if (!file) return

        setLoading(true)

        const fileName = `${Date.now()}-${file.name}`

        const response = await supabase.storage
            .from("games")
            .upload(fileName, file)

        console.log("UPLOAD RESPONSE:", response)

        if (response.error) {
            console.error(response.error)
            return
        }

        const {
            data: { publicUrl }
        } = supabase.storage
            .from("games")
            .getPublicUrl(fileName)

        console.log("PUBLIC URL:", publicUrl)

        onUpload(publicUrl)

    } catch (error) {
    console.error("CRASH:", error)
    }
    }

  return (
    <div>
      <input
        type="file"
        onChange={handleUpload}
      />

      {loading && <p>Uploading...</p>}
    </div>
  )
}