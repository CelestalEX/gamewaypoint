import type { ContextMenuSection } from "../types/contextMenuSection"

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
}: Props): ContextMenuSection[] => {

  return [

    {
      section: "Blocks",

      items: [

        {
          label: "Heading 1",

          onClick: () =>
            insertAtCursor("# ")
        },

        {
          label: "Warning",

          onClick: () =>
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

          onClick: copySelection
        },

        {
          label: "Cut",

          onClick: cutSelection
        },

        {
          label: "Paste",

          onClick: pasteClipboard
        },

        {
          label: "Undo",

          onClick: undo
        },

        {
          label: "Redo",

          onClick: redo
        }
      ]
    }
  ]
}