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

      let nextX = position.x
      let nextY = position.y

      if (
        rect.right >
        window.innerWidth - PADDING
      ) {
        nextX -=
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
        nextY -=
          rect.bottom -
          (
            window.innerHeight -
            PADDING
          )
      }

      if (
        nextX !== position.x ||
        nextY !== position.y 
      ){
        setPosition({
          x: nextX,
          y: nextY
      })
      }
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

  // AFTER LINK
  useEffect(() => {
    const handleFocus = () => {
      closeContextMenu()

    }

    window.addEventListener(
      "focus",
      handleFocus
    )

    return () => {

      window.removeEventListener(
        "focus",
        handleFocus
      )

  }

}, [])

  return {
    visible,
    position,
    openContextMenu,
    closeContextMenu,
    adjustPosition
  }
}