import { useEffect, useState } from "react"
import { getSafeMenuPosition } from "../helpers/getSafeMenuPosition"

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

    const adjustPosition = (
      rect: DOMRect
    ) => {

      const PADDING = 12

      let x = position.x
      let y = position.y

      if (
        rect.right >
        window.innerWidth - PADDING
      ) {
        x -=
          rect.right -
          (
            window.innerWidth -
            PADDING
          )
      }

      if (
        rect.bottom >
        window.innerHeight - PADDING
      ) {
        y -=
          rect.bottom -
          (
            window.innerHeight -
            PADDING
          )
      }

      setPosition({
        x,
        y
      })
    }

  // OPEN
  const openContextMenu = (
    clientX: number,
    clientY: number
  ) => {

    setPosition({
      x: clientX,
      y: clientY
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
    closeContextMenu,
    adjustPosition
  }
}