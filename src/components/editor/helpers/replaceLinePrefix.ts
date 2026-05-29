type Params = {
    text: string
    prefix: string
}

export const replaceLinePrefix = ({
text,
prefix
}: Params) => {

  const cleaned =
    text.replace(
      /^(#{1,6}\s|- |\d+.\s)/,
      ""
    )

  return prefix + cleaned
}
