import MarkdownPreview from "@/components/editor/preview/MarkdownPreview"

type Props = {
  content: string
}

export default function MobilePreview({
  content
}: Props) {

  return (

    <section>

      <p className="mb-3 text-sm font-bold">
        Mobile Preview
      </p>

      <div className="mx-auto w-93.75 overflow-hidden rounded-4xl border bg-white p-4">

        <MarkdownPreview
          content={content}
        />

      </div>

    </section>
  )
}