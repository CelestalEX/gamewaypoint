import type { ContextSection } from "../types/contextMenu"

type Params = {

  hasSelection: boolean

  wrapSelection: (
    before: string,
    after?: string
  ) => void

  insertAtCursor: (
    text: string
  ) => void

  copySelection: () => void

  cutSelection: () => void

  pasteClipboard: () => void

  undo: () => void

  redo: () => void
}

export const createContextActions = ({
  hasSelection,

  wrapSelection,
  insertAtCursor,

  copySelection,
  cutSelection,
  pasteClipboard,

  undo,
  redo

}: Params): ContextSection[] => {

  const sections: ContextSection[] = []

  // SELECTION ACTIONS

  if (hasSelection) {

    sections.push({

      section: "Formatting",

      items: [

        {
          label: "Bold",
          action: () =>
            wrapSelection("**")
        },

        {
          label: "Italic",
          action: () =>
            wrapSelection("*")
        },

        {
          label: "Code",
          action: () =>
            wrapSelection("`")
        },

        {
          label: "Link",
          action: () =>
            wrapSelection(
              "[",
              "](https://)"
            )
        }
      ]
    })

    sections.push({

      section: "Selection",

      items: [

        {
          label: "Copy",
          action: copySelection
        },

        {
          label: "Cut",
          action: cutSelection
        }
      ]
    })
  }

  // INSERT ACTIONS

  sections.push({

    section: "Insert",

    items: [

      {
        label: "Heading 1",
        action: () =>
          insertAtCursor("# ")
      },

      {
        label: "Heading 2",
        action: () =>
          insertAtCursor("## ")
      },

      {
        label: "Warning",
        action: () =>
          insertAtCursor(
`> [!WARNING]
> `
          )
      },

      {
        label: "Code Block",
        action: () =>
          insertAtCursor(
`\`\`\`ts

\`\`\``
          )
      },

      {
        label: "Table",
        action: () =>
          insertAtCursor(
`| Column | Value |
|---|---|
| Data | Example |`
          )
      }
    ]
  })

  // CLIPBOARD

  sections.push({

    section: "Clipboard",

    items: [

      {
        label: "Paste",
        action: pasteClipboard
      }
    ]
  })

  // HISTORY

  sections.push({

    section: "History",

    items: [

      {
        label: "Undo",
        action: undo
      },

      {
        label: "Redo",
        action: redo
      }
    ]
  })

  return sections
}