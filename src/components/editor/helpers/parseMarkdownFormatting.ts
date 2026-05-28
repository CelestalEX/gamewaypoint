type Formatting = {
  bold: boolean
  italic: boolean
  code: boolean
  link: boolean
}

const getAsteriskCount = (
  text: string
) => {

  const startMatch =
    text.match(/^(\*+)/)

  const endMatch =
    text.match(/(\*+)$/)

  return {
    start:
      startMatch?.[1].length ?? 0,

    end:
      endMatch?.[1].length ?? 0
  }
}

export const parseMarkdownFormatting = (
  text: string
): Formatting => {

  const normalized =
    text.trim()

  const {
    start,
    end
  } = getAsteriskCount(normalized)

  const stars =
    start === end
      ? start
      : 0

  return {

    bold:
      stars >= 2,

    italic:
      stars === 1 ||
      stars === 3,

    code:
      /^`[\s\S]+`$/
        .test(normalized),

    link:
      /^\[[\s\S]+\]\([\s\S]+\)$/
        .test(normalized)
  }
}