import { headingSlug } from "./headingSlug"

export type Heading = {
  level: number
  text: string
  id: string
}

export function extractHeadings(
  markdown: string
): Heading[] {

  const lines =
    markdown.split("\n")

  const headings: Heading[] = []

  for (const line of lines) {

    const match =
      line.match(/^(#{1,6})\s+(.*)/)

    if (!match) continue

    const level =
      match[1].length

    const text =
      match[2].trim()

    headings.push({
      level,
      text,
      id: headingSlug(text)
    })
  }

  return headings
}