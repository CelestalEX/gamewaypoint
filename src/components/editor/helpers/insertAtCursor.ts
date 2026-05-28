import { RefObject } from "react"

type Params = {
    textareaRef: RefObject<HTMLTextAreaElement | null>
    content: string
    text: string
    updateContent: (value: string) => void
}

export const insertAtCursor = ({
    textareaRef,
    content,
    text,
    updateContent
}: Params) => {

    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const newContent =
      content.slice(0, start) +
      text +
      content.slice(end)

    updateContent(newContent)

    requestAnimationFrame(() => {
      textarea.focus()

      const cursor = start + text.length

      textarea.selectionStart = textarea.selectionEnd = cursor
    })
}

//  USAGE

//  INSTEAD OF:

//  insertAtCursor("# ")

//  USE:

//  insertAtCursor({
//    textareaRef,
//    content,
//    text: "# "
//    updateContent
//  })