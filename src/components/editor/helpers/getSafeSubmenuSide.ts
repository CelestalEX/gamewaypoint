type Params = {
  triggerRect: DOMRect
  submenuWidth: number
  padding?: number
}

export const getSafeSubmenuSide = ({
  triggerRect,
  submenuWidth,
  padding = 12
}: Params): "left" | "right" => {

  const spaceRight =
    window.innerWidth -
    triggerRect.right

  if (
    spaceRight <
    submenuWidth + padding
  ) {
    return "left"
  }

  return "right"
}