import { RefObject } from "react"
import { toggleMarkdownSyntax } from "./toggleMarkdownSyntax"
import { after, before } from "node:test"

type Params = {
  textareaRef: RefObject<HTMLTextAreaElement | null>
  content: string
  beforeSyntax: string
  afterSyntax?: string
  updateContent: (value: string) => void
}

export const wrapSelection = ({
  textareaRef,
  content,
  beforeSyntax,
  afterSyntax,
  updateContent
}: Params) => {

  const textarea = textareaRef.current

  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd

  if (start === end) return

  const selectedText =
    content.slice(start, end)

  const normalized = selectedText.trim()

  const closingSyntax = afterSyntax ?? beforeSyntax

  const isSymmetric = beforeSyntax === closingSyntax

  let result: string

  if (isSymmetric) {
    result =
      toggleMarkdownSyntax({
        text: normalized,
        syntax: beforeSyntax
      })
  } else {
    const fullyWrapped =
      normalized.startsWith(beforeSyntax) &&
      normalized.endsWith(closingSyntax)

    if (fullyWrapped) {
      result =
        normalized.slice(
          beforeSyntax.length,
          normalized.length -
          closingSyntax.length
        )
    } else {
      result = beforeSyntax + normalized + closingSyntax
    }
  }

  const newContent =
    content.slice(0, start) +
    result +
    content.slice(end)

  console.log("wrapSelection updateContent")
  updateContent(newContent)

  requestAnimationFrame(() => {

    textarea.focus()

    const leadingSpaces = selectedText.length - selectedText.trimStart().length

    textarea.selectionStart = start

    textarea.selectionEnd =
      start + leadingSpaces + result.length
  })
}