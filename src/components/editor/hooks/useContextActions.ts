import type { ContextMenuSection } from "../types/contextMenuSection"
import { Bold, Italic, Code2, Link2, Copy, Clipboard, Scissors, Undo2, Redo2, Heading1, Heading2, Redo} from "lucide-react"

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
          icon: Copy,
          onClick: copySelection
        },

        {
          label: "Paste",
          icon: Clipboard,
          onClick: pasteClipboard
        },

        {
          label: "Cut",
          icon: Scissors,
          onClick: cutSelection
        },

        {
          label: "Undo",
          icon: Undo2,
          onClick: undo
        },

        {
          label: "Redo",
          icon: Redo2,
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
              icon: Heading1,
              onClick: () =>
                insertAtCursor("# ")
            },

            {
              label: "Heading 2",
              icon: Heading2,
              onClick: () =>
                insertAtCursor("## ")
            },

            {
              label: "Divider",
              onClick: () =>
                insertAtCursor("\n---\n")
            },

            {
              label: "Table",
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
              icon: Bold,
              shortcut: "Ctrl+B",
              onClick: () =>
                insertAtCursor("**Text**")
            },

            {
              label: "Italic",
              icon: Italic,
              shortcut: "Ctrl+I",
              onClick: () =>
                insertAtCursor("*Text*")
            },

            {
              label: "Code",
              icon: Code2,
              shortcut: "Ctrl+E",
              onClick: () =>
                insertAtCursor("`Text`")
            },

            {
              label: "Link",
              icon: Link2,
              shortcut: "Ctrl+K",
              onClick: () =>
                insertAtCursor(
                  "[Text](https://)"
                )
            }
          ]
        }
      ]
    }

    
  ]
}