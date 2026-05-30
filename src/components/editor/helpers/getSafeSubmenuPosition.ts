type Params = {
  triggerRect: DOMRect
  submenuWidth: number
  submenuHeight: number
  padding?: number
}

export const getSafeSubmenuPosition = ({
  triggerRect,
  submenuWidth,
  submenuHeight,
  padding = 12
}: Params) => {

  const side: "left" | "right" =
    window.innerWidth -
      triggerRect.right <
    submenuWidth + padding
      ? "left"
      : "right"

  let top = 0

  const bottomOverflow =
    triggerRect.top +
    submenuHeight -
    window.innerHeight +
    padding

  if (bottomOverflow > 0) {

    top = -bottomOverflow

  }

  return {
    side,
    top
  }
}