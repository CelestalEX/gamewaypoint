import { uploadGuideImage } from "../services/uploadGuideImage"

type Props = {
  onInsert: (
    text: string
  ) => void
}

export const useImageUpload = ({
  onInsert
}: Props) => {

  const uploadImage = async (
    file: File
  ) => {

    const publicUrl = await uploadGuideImage(file)
    
    onInsert(
      `\n![image](${publicUrl})\n`
    )
  }

  return {
    uploadImage
  }
}