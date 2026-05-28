import { RefObject } from "react"

type Params = {
  textareaRef: RefObject<HTMLTextAreaElement | null>
  content: string
  prefix: string
  updateContent: (
    value: string
  ) => void
}

export const toggleLinePrefix = ({
  textareaRef,
  content,
  prefix,
  updateContent
}: Params) => {

  const textarea = textareaRef.current

  if (!textarea) return

  const start = textarea.selectionStart

  const end = textarea.selectionEnd

  const before = content.slice(0, start)

  const selected = content.slice(start, end)

  const after = content.slice(end)

  const lines = selected.split("\n")

  const allPrefixed =
    lines.every((line) =>
      line.startsWith(prefix)
    )

  const nextLines =
    lines.map((line) => {

      if (allPrefixed) {
        return line.replace(prefix, "")
      }

      return prefix + line
    })

  const nextSelected =
    nextLines.join("\n")

  const nextContent =
    before +
    nextSelected +
    after

  updateContent(nextContent)

  requestAnimationFrame(() => {

    textarea.focus()

    textarea.selectionStart =
      start

    textarea.selectionEnd =
      start + nextSelected.length
  })
}