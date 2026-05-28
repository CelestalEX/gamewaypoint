"use client"

import MarkdownRenderer from "./MarkdownRenderer"

type Props = {
  content: string
  onChange: (value: string) => void
}

export default function GuideEditor({
  content,
  onChange
}: Props) {

  const insertSyntax = (syntax: string) => {
    onChange(content + syntax)
  }

  return(
    <div className="space-y-4">

      <div className="flex flex-wrap gap-2">

        <button
          type="button"
          onClick={() =>
            insertSyntax("\n# Heading\n")
          }
          className="px-3 py-1 rounded-md bg-zinc-500/20 hover:bg-zinc-500/30 text-black border border-zinc-500"
        >
          H1
        </button>

        <button
          type="button"
          onClick={() =>
            insertSyntax("\n## Heading\n")
          }
          className="px-3 py-1 rounded-md bg-zinc-500/20 hover:bg-zinc-500/30 text-black border border-zinc-500"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            insertSyntax("\n- List item")
          }
          className="px-3 py-1 rounded-md bg-zinc-500/20 hover:bg-zinc-500/30 text-black border border-zinc-500"
        >
          List
        </button>

        <button
          type="button"

          onClick={() =>
            insertSyntax(
              `\n\`\`\`js
              code here
              \`\`\`\n`
            )
          }

          className="px-3 py-1 rounded-md bg-zinc-500/20 hover:bg-zinc-500/30 text-black border border-zinc-500"
        >
          Code
        </button>

        <button
          type="button"

          onClick={() =>
            insertSyntax(
              `\n| Column | Value |
              |---|---|
              | Data | Example |\n`
            )
          }

          className="px-3 py-1 rounded-md bg-zinc-500/20 hover:bg-zinc-500/30 text-black border border-zinc-500"
        >
          Table
        </button>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <textarea

          value={content}

          onChange={(e) =>
            onChange(
              e.target.value
            )
          }

          placeholder="Write markdown here..."
          className="min-h-150 w-full rounded-xl border border-zinc-800 bg-white p-4 font-mono text-sm outline-none focus:border-red-500"
        />

        <div className="min-h-150 rounded-xl border border-zinc-800 bg-white p-6 overflow-y-auto">
          <MarkdownRenderer
            content={content}
          />
        </div>
      </div>
    </div>
  )
}