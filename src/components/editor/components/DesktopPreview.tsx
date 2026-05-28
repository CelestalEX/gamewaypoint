import MarkdownPreview from "@/components/editor/preview/MarkdownPreview"

type Props = {
  content: string
}

export default function DesktopPreview({
  content
}: Props) {

  return (

    <section>

      <p className="mb-3 text-sm font-bold">
        Desktop Preview
      </p>

      <div className="rounded-2xl p-6">

        <MarkdownPreview
          content={content}
        />

      </div>

    </section>
  )
}