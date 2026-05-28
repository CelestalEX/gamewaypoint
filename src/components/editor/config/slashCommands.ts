import { SlashCommand } from "../types/slash"

export const slashCommands: SlashCommand[] = [

  {
    label: "Heading 1",
    value: "# "
  },

  {
    label: "Heading 2",
    value: "## "
  },

  {
    label: "Heading 3",
    value: "### "
  },

  {
    label: "Warning",
    value:
`> [!WARNING]
> `,
    searchTerms: [
        "warn",
        "danger",
        "alert"
    ]
  },

  {
    label: "Tip",
    value:
`> [!TIP]
> `
  },

  {
    label: "Spoiler",
    value:
`> [!SPOILER]
> `
  },

  {
    label: "Code Block",
    value:
`\`\`\`ts

\`\`\``
  },

  {
    label: "Table",
    value:
`| Column | Value |
|---|---|
| Data | Example |`
  }
]