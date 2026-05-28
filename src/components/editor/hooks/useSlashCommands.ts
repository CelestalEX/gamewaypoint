import { useState, useEffect, RefObject } from "react"

import { slashCommands } from "../config/slashCommands"

type Params = {
  textareaRef: RefObject<HTMLTextAreaElement | null>
  content: string
  updateContent: (value: string) => void
}

const getSlashQuery = (text: string) => {
  const match = text.match(/\/([a-zA-Z]*)$/)

  return match
    ? match[1]
    : null
}

export const useSlashCommands = ({
  textareaRef,
  content,
  updateContent
}: Params) => {

  const [showSlashMenu, setShowSlashMenu] = useState(false)

  const [slashQuery, setSlashQuery] = useState("")

  const [selectedCommand, setSelectedCommand] = useState(0)

  const [slashPosition, setSlashPosition] =
    useState({
      top: 0,
      left: 0
    })

  const filteredCommands =
    slashCommands.filter((command) => {

      const query =
        slashQuery.toLowerCase()

      return (
        command.label
          .toLowerCase()
          .includes(query)

        ||

        command.searchTerms?.some(
          (term) =>
            term
              .toLowerCase()
              .includes(query)
        )
      )
    })

  const insertSlashCommand = (
    syntax: string
  ) => {

    const textarea = textareaRef.current

    if (!textarea) return

    const start = textarea.selectionStart

    const before =
      content.slice(0, start)

    const after =
      content.slice(start)

    const newBefore =
      before.replace(
        /\/[a-zA-Z]*$/,
        ""
      )

    const newContent =
      newBefore +
      syntax +
      after

    updateContent(newContent)

    setShowSlashMenu(false)

    requestAnimationFrame(() => {

      textarea.focus()

      const cursor =
        newBefore.length +
        syntax.length

      textarea.selectionStart = cursor
      textarea.selectionEnd = cursor
    })
  }

  const handleSlashCommand = (
    value: string
  ) => {

    const textarea =
      textareaRef.current

    if (!textarea) return

    const cursor =
      textarea.selectionStart

    const beforeCursor =
      value.slice(0, cursor)

    const query =
      getSlashQuery(beforeCursor)

    if (query !== null) {

      const rect =
        textarea.getBoundingClientRect()

      setSlashPosition({
        top: rect.top + 120,
        left: rect.left + 40
      })

      setShowSlashMenu(true)

      setSlashQuery(query)

    } else {

      setShowSlashMenu(false)

      setSlashQuery("")
    }
  }

  useEffect(() => {
    setSelectedCommand(0)
  }, [slashQuery])

  return {

    showSlashMenu,
    slashPosition,
    slashQuery,
    selectedCommand,
    filteredCommands,

    setShowSlashMenu,
    setSlashQuery,
    setSelectedCommand,

    handleSlashCommand,
    insertSlashCommand
  }
}