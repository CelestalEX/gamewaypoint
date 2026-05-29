import { RefObject } from "react"

type Props = {
  content: string
  textareaRef: RefObject<HTMLTextAreaElement | null>
  updateContent: ( value: string ) => void
}

export const useClipboard = ({
  content,
  textareaRef,
  updateContent
}: Props) => {

  // COPY
  const copySelection = async () => {

    const textarea = textareaRef.current

    if (!textarea) return

    const selected =
      content.slice(
        textarea.selectionStart,
        textarea.selectionEnd
      )

    await navigator.clipboard.writeText(selected)
  }

  // CUT
  const cutSelection = async () => {

    const textarea = textareaRef.current

    if (!textarea) return

    const start = textarea.selectionStart

    const end = textarea.selectionEnd

    const selected = content.slice(start, end)

    await navigator.clipboard.writeText(selected)

    const newContent =
      content.slice(0, start) +
      content.slice(end)

    updateContent(newContent)

    requestAnimationFrame(() => {

      textarea.focus()

      textarea.selectionStart =
        textarea.selectionEnd =
          start
    })
  }

  // PASTE
  const pasteClipboard = async () => {

    const textarea = textareaRef.current

    if (!textarea) return

    const scrollTop = textarea.scrollTop

    const text = await navigator.clipboard.readText()

    const start = textarea.selectionStart

    const end = textarea.selectionEnd

    const newContent =
      content.slice(0, start) +
      text +
      content.slice(end)

    updateContent(newContent)

    requestAnimationFrame(() => {

      textarea.focus()

      textarea.scrollTop = scrollTop

      const cursor =
        start + text.length

      textarea.selectionStart =
        textarea.selectionEnd =
          cursor
    })
  }

  return {
    copySelection,
    cutSelection,
    pasteClipboard
  }
}