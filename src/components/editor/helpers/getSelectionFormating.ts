import { parseMarkdownFormatting } from "./parseMarkdownFormatting"

type Params = {
  content: string
  start: number
  end: number
}

export const getSelectionFormatting = ({
  content,
  start,
  end
}: Params) => {

  const selectedText =
    content.slice(start, end)

  return parseMarkdownFormatting(
    selectedText
  )
}