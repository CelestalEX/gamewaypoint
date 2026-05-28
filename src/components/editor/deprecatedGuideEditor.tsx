"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import Heading from "@tiptap/extension-heading"
import BulletList from "@tiptap/extension-bullet-list"
import ListItem from "@tiptap/extension-list-item"
import Placeholder from "@tiptap/extension-placeholder"
import { Callout } from "@/extensions/Callout"
import { BubbleMenu } from "@tiptap/react/menus"

import { useEffect, useState } from "react"

type Props = {
  content: string
  onChange: (value: string) => void
}

export default function GuideEditor({
  content,
  onChange
}: Props) {

  const [, forceUpdate] = useState({})

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2]
      }),
      BulletList,
      ListItem,
      Callout,
      Placeholder.configure({
        placeholder:
          "Write your ultimate gaming guide..."
      })
    ],

    content,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class: ` prose max-w-none min-h-[400px] p-6 rounded-xl border border-gray-500 bg-gray-200 text-black focus:outline-none`
      }
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML())
    }
  })

  useEffect(() => {

    if (!editor) return

    const updateToolbar = () => {
      forceUpdate({})
    }

    editor.on("selectionUpdate", updateToolbar)
    editor.on("transaction", updateToolbar)

    return () => {
      editor.off("selectionUpdate", updateToolbar)
      editor.off("transaction", updateToolbar)
    }

  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="space-y-1">

      <div className="flex flex-wrap gap-2 border border-gray-500 p-3 rounded-xl bg-gray-200">

        <button
          className={
            editor.isActive("bold")
              ? "bg-blue-500 text-white px-3 py-1 rounded"
              : "bg-zinc-700 text-white px-3 py-1 rounded"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
        >
          Bold
        </button>

        <button
          className={
            editor.isActive("italic")
              ? "bg-blue-500 text-white px-3 py-1 rounded"
              : "bg-zinc-700 text-white px-3 py-1 rounded"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
        >
          Italic
        </button>

        <button
          className={
            editor.isActive("heading", {
              level: 1
            })
              ? "bg-blue-500 text-white px-3 py-1 rounded"
              : "bg-zinc-700 text-white px-3 py-1 rounded"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 1
              })
              .run()
          }
        >
          H1
        </button>

        <button
          className={
            editor.isActive("heading", {
              level: 2
            })
              ? "bg-blue-500 text-white px-3 py-1 rounded"
              : "bg-zinc-700 text-white px-3 py-1 rounded"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 2
              })
              .run()
          }
        >
          H2
        </button>

        <button
          className={
            editor.isActive("bulletList")
              ? "bg-blue-500 text-white px-3 py-1 rounded"
              : "bg-zinc-700 text-white px-3 py-1 rounded"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
        >
          List
        </button>

        <button
          className={
            editor.isActive("codeBlock")
              ? "bg-blue-500 text-white px-3 py-1 rounded"
              : "bg-zinc-700 text-white px-3 py-1 rounded"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleCodeBlock()
              .run()
          }
        >
          Code
        </button>

        <button
          className="
            bg-zinc-700
            text-white
            px-3
            py-1
            rounded
          "

          onClick={() =>
            editor
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          Undo
        </button>

        <button
          className="
            bg-zinc-700
            text-white
            px-3
            py-1
            rounded
          "

          onClick={() =>
            editor
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          Redo
        </button>

        <button
          className="
            bg-zinc-700
            text-white
            px-3
            py-1
            rounded
          "

          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent(`
                  <div data-callout>
                    <p>Boss Tip...</p>
                  </div>
                `)
              .run()
          }
        >
          Callout
        </button>

      </div>    

      <BubbleMenu
        editor={editor}
      >

        <div className=" flex gap-2 bg-zinc-800 border rounded-lg p-2 shadow-lg">

            <button
              className={
                editor.isActive("bold")
                ? "bg-blue-500 text-white px-2 py-1 rounded"
                : "bg-zinc-700 text-white px-2 py-1 rounded"
              }

              onClick={() =>
                editor.chain().focus().toggleBold().run()
              }
            >
              Bold
            </button>

            <button
              className={
                editor.isActive("italic")
                ? "bg-blue-500 text-white px-2 py-1 rounded"
                : "bg-zinc-700 text-white px-2 py-1 rounded"
            }

             onClick={() =>
                editor.chain().focus().toggleItalic().run()
            }
            >
              Italic
            </button>

    <button
      className={
        editor.isActive("codeBlock")
          ? "bg-blue-500 text-white px-2 py-1 rounded"
          : "bg-zinc-700 text-white px-2 py-1 rounded"
      }

      onClick={() =>
        editor.chain().focus().toggleCodeBlock().run()
      }
    >
      Code
    </button>

    </div>

        </BubbleMenu>

      <EditorContent editor={editor} />

    </div>
  )
}