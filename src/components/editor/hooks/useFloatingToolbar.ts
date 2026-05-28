import { useState, useEffect, useMemo } from "react"

import { getSelectionFormatting } from "../helpers/getSelectionFormating"
import { getLineFormatting } from "../helpers/getLineFormatting"

type Props = {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  content: string
}

const clamp = (
  value: number,
  min: number,
  max: number
) => {
  return Math.min(
    Math.max(value, min),
    max
  )
}

export const useFloatingToolbar = ({
  textareaRef,
  content
}: Props) => {

  const [ showFloatingToolbar, setShowFloatingToolbar ] = useState(false)

  const [ floatingPosition, setFloatingPosition ] = 
    useState({
      top: 0,
      left: 0
    })

  const [ selectionRange, setSelectionRange ] =
    useState({
      start: 0,
      end: 0
    })

  const [ blockType, setBlockType ] = useState('Normal')

  const formatting = useMemo(() => {

    const {start, end} = selectionRange

    if (start === end) {
      return {
        bold: false,
        italic: false,
        code: false,
        link: false
      }
    }

    return getSelectionFormatting({
      content,
      start,
      end
    })

  }, [
    content,
    selectionRange.start,
    selectionRange.end
  ])

  const handleSelection = (
    e: React.MouseEvent<HTMLTextAreaElement>
  ) => {

    const textarea = textareaRef.current

    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    setSelectionRange({
      start,
      end
    })

    // no selection
    if (start === end) {

      setShowFloatingToolbar(false)

      return
    }

    const TOOLBAR_WIDTH = 300
    const SCREEN_PADDING = 16

    const rawLeft = e.clientX - TOOLBAR_WIDTH / 2

    const clampedLeft = clamp(
      rawLeft,
      SCREEN_PADDING,
      window.innerWidth -
        TOOLBAR_WIDTH -
        SCREEN_PADDING
    )

    const top = Math.max(
      e.clientY - 60,
      SCREEN_PADDING
    )

    setFloatingPosition({
      top,
      left: clampedLeft
    })

    setShowFloatingToolbar(true)

    const currentBlockType =
      getLineFormatting({
        content,
        start
      })

    setBlockType(currentBlockType)
  }

  const hideFloatingToolbar = () => {
    setShowFloatingToolbar(false)
  }

  return {
    blockType,

    formatting,

    showFloatingToolbar,

    floatingPosition,

    handleSelection,

    hideFloatingToolbar,
  }
}