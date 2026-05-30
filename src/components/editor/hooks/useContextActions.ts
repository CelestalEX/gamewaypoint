import { Editor } from "@tiptap/core"
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
      section: "Edit",

      items: [

        {
          label: "Copy",

          onClick: copySelection
        },

        {
          label: "Paste",

          onClick: pasteClipboard
        },

        {
          label: "Cut",

          onClick: cutSelection
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
    },

    {
      section: "Editor",

      items: [
        {
          label: "Insert",
          submenu: [
            {
              label: "Heading 1",
              onClick: () =>
                insertAtCursor("# ")
            },

            {
              label: "Heading 2",
              onClick: () =>
                insertAtCursor("## ")
            },

            {
              label: "Divider",
              onClick: () =>
                insertAtCursor("\n---\n")
            },

            {
              label: "table",
              onClick: () =>
                insertAtCursor(
`| Column | Column |
|--------|--------|
| Value  | Value  |`
                )
            },

            {
              label: "Callout",
              submenu: [
                {
                  label: "Warning",
                  onClick: () =>
                    insertAtCursor(
`> [!WARNING]
> `                      
                    )
                },

                {
                  label: "Tip",
                  onClick: () =>
                    insertAtCursor(
`> [!TIP]
> `
                    )
                },

                {
                  label: "Spoiler",
                  onClick: () => 
                    insertAtCursor(
`> [!SPOILER]
> `
                    )
                }
              ]
            }
          ]
        },

        {
          label: "Formatting",
          submenu: [
            {
              label: "Bold",
              shortcut: "Ctrl+B",
              onClick: () =>
                wrapSelection("**")
            },

            {
              label: "Italic",
              shortcut: "Ctrl+I",
              onClick: () =>
                wrapSelection("*")
            },

            {
              label: "Code",
              shortcut: "Ctrl+E",
              onClick: () =>
                wrapSelection("`")
            },

            {
              label: "Link",
              shortcut: "Ctrl+K",
              onClick: () =>
                wrapSelection(
                  "[",
                  "](https://)"
                )
            }
          ]
        }
      ]
    }

    
  ]
}