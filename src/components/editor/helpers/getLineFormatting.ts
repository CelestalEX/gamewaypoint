type Params = {
  content: string
  start: number
}

export const getLineFormatting = ({
  content,
  start
}: Params) => {

  const beforeCursor =
    content.slice(0, start)

  const lineStart =
    beforeCursor.lastIndexOf("\n") + 1

  const lineEnd =
    content.indexOf("\n", start) === -1
      ? content.length
      : content.indexOf("\n", start)

  const line =
    content.slice(lineStart, lineEnd)

  if (line.startsWith("# ")) {
    return "Heading 1"
  }

  if (line.startsWith("## ")) {
    return "Heading 2"
  }

  if (line.startsWith("- ")) {
    return "Bullet List"
  }

  if (/^\d+\.\s/.test(line)) {
    return "Numbered List"
  }

  return "Normal"
}