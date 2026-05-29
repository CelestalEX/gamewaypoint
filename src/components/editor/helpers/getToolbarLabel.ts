type Params = {
    content: string
    start: number
}

export const getBlockType = ({
    content,
    start
}: Params) => {

    const lineStart = content.lastIndexOf("\n", start - 1) + 1

    const lineEnd = content.indexOf("\n", start)

    const currentLine = 
      content.slice(
        lineStart,
        lineEnd === -1
          ? content.length
          : lineEnd
      )

    if (currentLine.startsWith("# ")) {
      return "Heading 1"
    }

    if (currentLine.startsWith("## ")) {
      return "Heading 2"
    }

    return "Normal"
}
