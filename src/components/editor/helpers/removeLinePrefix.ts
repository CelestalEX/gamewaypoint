import { RefObject } from "react"

type Params = {
  textareaRef: RefObject<HTMLTextAreaElement | null>

  content: string

  updateContent: (
    value: string
  ) => void
}

export const removeLineFormatting = ({
  textareaRef,
  content,
  updateContent
}: Params) => {

  const textarea =
    textareaRef.current

  if (!textarea) return

  const start =
    textarea.selectionStart

  const end =
    textarea.selectionEnd

  const selected =
    content.slice(start, end)

  const lines =
    selected.split("\n")

  const cleaned =
    lines.map((line) => {

      return line
        .replace(/^#{1,6}\s/, "")
        .replace(/^- /, "")
        .replace(/^\d+\.\s/, "")
    })

  const nextSelected =
    cleaned.join("\n")

  const nextContent =
    content.slice(0, start) +
    nextSelected +
    content.slice(end)

  updateContent(nextContent)

  requestAnimationFrame(() => {

    textarea.focus()

    textarea.selectionStart =
      start

    textarea.selectionEnd =
      start + nextSelected.length
  })
}