import { useState } from "react"

type Position = {
  top: number
  left: number
}

export const useSelectionToolbar = () => {

  const [
    showSelectionToolbar,
    setShowSelectionToolbar
  ] = useState(false)

  const [
    selectionPosition,
    setSelectionPosition
  ] = useState<Position>({
    top: 0,
    left: 0
  })

  const openSelectionToolbar = (
    top: number,
    left: number
  ) => {

    setSelectionPosition({
      top,
      left
    })

    setShowSelectionToolbar(true)
  }

  const closeSelectionToolbar = () => {
    setShowSelectionToolbar(false)
  }

  return {

    showSelectionToolbar,

    selectionPosition,

    openSelectionToolbar,

    closeSelectionToolbar
  }
}