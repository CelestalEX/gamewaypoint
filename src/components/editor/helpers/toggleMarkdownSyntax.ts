type Params = {
  text: string
  syntax: string
}

const getStarCount = (
  text: string
) => {

  const match =
    text.match(/^(\*+)/)

  return match?.[1].length ?? 0
}

export const toggleMarkdownSyntax = ({
  text,
  syntax
}: Params) => {

  const normalized =
    text.trim()

  const stars =
    getStarCount(normalized)

  const inner =
    normalized.replace(/^\*+|\*+$/g, "")

  // TOGGLE BOLD

  if (syntax === "**") {

    // ***text*** -> *text*
    if (stars === 3) {
      return `*${inner}*`
    }

    // **text** -> text
    if (stars === 2) {
      return inner
    }

    // *text* -> ***text***
    if (stars === 1) {
      return `***${inner}***`
    }

    return `**${inner}**`
  }

  if (syntax === "`"){

    const fullyWrapped =
      normalized.startsWith("`") &&
      normalized.endsWith("`")

    if (fullyWrapped) {
      return normalized.slice(1, -1)
    }

    return `\`${normalized}\``

  }

  // TOGGLE ITALIC

  if (syntax === "*") {

    // ***text*** -> **text**
    if (stars === 3) {
      return `**${inner}**`
    }

    // *text* -> text
    if (stars === 1) {
      return inner
    }

    // **text** -> ***text***
    if (stars === 2) {
      return `***${inner}***`
    }

    return `*${inner}*`
  }

  return `${syntax}${inner}${syntax}`
}