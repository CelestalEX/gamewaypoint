type Props = {
  onInsert: (value: string) => void
  onImageUpload: (file: File) => void
}

const buttons = [

  {
    label: "Undo",
    value: "__UNDO__"  
  },

  {
    label: "Redo",
    value: "__REDO__"
  },

  {
    label: "H1",
    value: "\n# Heading\n"
  },

  {
    label: "H2",
    value: "\n## Heading\n"
  },

  {
    label: "H3",
    value: "\n### Heading\n"
  },

  {
    label: "Bold",
    value: "**bold text**"
  },

  {
    label: "Italic",
    value: "*italic text*"
  },

  {
    label: "List",
    value: "\n- List item"
  },

  {
    label: "Quote",
    value: "\n> Quote"
  },

  {
    label: "Code",
    value:
`\n\`\`\`ts
const hello = "world"
\`\`\`\n`
  },

  {
    label: "Table",
    value: 
`\n| Column | Value |
|---|---|
| Data | Example |\n`
  },

  {
    label: "Warning",
    value:
`> [!WARNING]
> Danger ahead\n`
  },

  {
    label: "Tip",
    value:
`> [!TIP]
> Helpful information\n`
  },

  {
    label: "Spoiler",
    value:
`> [!SPOILER]
> Hidden content\n`
  }
]

export default function EditorToolbar({
  onInsert,
  onImageUpload
}: Props) {

  return (

    <div className="flex flex-wrap gap-2">

      {buttons.map((button) => (

        <button
          key={button.label}
          type="button"
          onClick={() =>
            onInsert(button.value)
          }
          className="px-3 py-1 rounded-md border border-zinc-800 bg-white hover:bg-zinc-700 text-sm"
        >
          {button.label}
        </button>

      ))}

      <label className="px-3 py-1 rounded-md border border-zinc-800 bg-white hover:bg-zinc-700 text-sm cursor-pointer">
        Upload Image
        <input 
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              if(!file) return

              onImageUpload(file)
            }}
            />
      </label>

    </div>
  )
}