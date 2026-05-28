import MarkdownRenderer from "@/components/MarkdownRenderer"

type Props = {
  content: string
}

export default function MarkdownPreview({
  content
}: Props) {

  return (

    <div className="max-w-3xl mx-auto min-h-175 rounded-xl border border-zinc-800 bg-white p-6 overflow-y-auto">

      <MarkdownRenderer
        content={content}
      />

    </div>
  )
}