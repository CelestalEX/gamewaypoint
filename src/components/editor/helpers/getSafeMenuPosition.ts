type Params = {
  x: number
  y: number

  width: number
  height: number

  padding?: number
}

export const getSafeMenuPosition = ({
  x,
  y,
  width,
  height,
  padding = 12
}: Params) => {

  return {

    x: Math.min(
      x,
      window.innerWidth -
        width -
        padding
    ),

    y: Math.min(
      y,
      window.innerHeight -
        height -
        padding
    )
  }
}