import { Node, mergeAttributes } from "@tiptap/core"

export const Callout = Node.create({

  name: "callout",

  group: "block",

  content: "block+",

  parseHTML() {
    return [
      {
        tag: "div[data-callout]"
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-callout": "",
        class:
          "border border-yellow-500 bg-yellow-100 p-4 rounded my-4"
      }),
      0
    ]
  }

})