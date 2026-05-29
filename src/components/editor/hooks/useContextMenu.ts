import { useEffect, useState } from "react"

export const useContextMenu = () => {

  const [visible, setVisible] = useState<boolean>(false)

  const [position, setPosition] =
    useState<{
      x: number
      y: number
    }>({
      x: 0,
      y: 0
    })

  // OPEN
  const openContextMenu = (
    x: number,
    y: number
  ) => {
    
    setPosition({
      x,
      y
    })
    
    setVisible(true)

  }

  // CLOSE
  const closeContextMenu = () => {
    setVisible(false)
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
    visible,
    position,
    openContextMenu,
    closeContextMenu
  }
}