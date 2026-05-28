import { useState } from "react"

import { getCaretCoordinates } from "../helpers/getCaretCoordinates"

import { FLOATING_TOOLBAR_OFFSET_Y } from "../constants/editor"

type Props = {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}

export const useTextareaSelection = ({
  textareaRef
}: Props) => {

  const [showSelectionToolbar, setShowSelectionToolbar] =
    useState(false)

  const [selectionPosition, setSelectionPosition] =
    useState({
      top: 0,
      left: 0
    })

  const handleSelection = () => {

    const textarea = textareaRef.current

    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    if (start === end) {

      setShowSelectionToolbar(false)
      return
    }

    const middle =
      Math.floor((start + end) / 2)

    const coords =
      getCaretCoordinates(
        textarea,
        middle
      )

    setSelectionPosition({
      top: coords.top - FLOATING_TOOLBAR_OFFSET_Y,
      left: coords.left
    })

    setShowSelectionToolbar(true)
  }

  const hideSelectionToolbar = () => {
    setShowSelectionToolbar(false)
  }

  return {
    showSelectionToolbar,
    selectionPosition,
    handleSelection,
    hideSelectionToolbar
  }
}