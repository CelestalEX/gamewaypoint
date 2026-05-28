import { supabase } from "@/lib/supabase"

export const uploadGuideImage =
  async (file: File) => {

    const fileName =
      `${Date.now()}-${file.name}`

    const { error } =
      await supabase.storage
        .from("guide-images")
        .upload(fileName, file)

    if (error) {
      throw error
    }

    const {
      data: { publicUrl }
    } = supabase.storage
      .from("guide-images")
      .getPublicUrl(fileName)

    return publicUrl
  }