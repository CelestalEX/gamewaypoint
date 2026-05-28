import { useEffect, useState } from "react"

type Props = {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}

export const useContextMenu = ({
  textareaRef
}: Props) => {

  const [contextMenu, setContextMenu] =
    useState({
      visible: false,
      x: 0,
      y: 0
    })

  const [hasSelection, setHasSelection] = useState(false)

  // OPEN
  const handleContextMenu = (
    e: React.MouseEvent<HTMLTextAreaElement>
  ) => {
    const textarea = textareaRef.current

    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const hasSelection = start !== end

    e.preventDefault()

    setHasSelection(start !== end)

    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY
    })
  }





  // CLOSE
  const closeContextMenu = () => {
    setContextMenu({
      visible: false,
      x: 0,
      y: 0
    })
  }

  // CLICK OUTSIDE
  useEffect(() => {

    window.addEventListener(
      "click",
      closeContextMenu
    )

    return () =>
      window.removeEventListener(
        "click",
        closeContextMenu
      )

  }, [])

  return {
    contextMenu,
    hasSelection,
    handleContextMenu,
    closeContextMenu
  }
}