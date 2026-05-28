type Props = {

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

export const useContextActions = ({
  wrapSelection,
  insertAtCursor,
  copySelection,
  cutSelection,
  pasteClipboard,
  undo,
  redo
}: Props) => {

  return [

    {
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
    },

    {
      section: "Blocks",

      items: [

        {
          label: "Heading 1",

          action: () =>
            insertAtCursor("# ")
        },

        {
          label: "Warning",

          action: () =>
            insertAtCursor(
`> [!WARNING]
> `
            )
        }
      ]
    },

    {
      section: "Edit",

      items: [

        {
          label: "Copy",

          action: copySelection
        },

        {
          label: "Cut",

          action: cutSelection
        },

        {
          label: "Paste",

          action: pasteClipboard
        },

        {
          label: "Undo",

          action: undo
        },

        {
          label: "Redo",

          action: redo
        }
      ]
    }
  ]
}