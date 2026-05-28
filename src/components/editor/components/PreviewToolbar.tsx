type Props = {

  previewLayout:
    | "desktop"
    | "mobile"
    | "both"

  setPreviewLayout: (
    layout:
      | "desktop"
      | "mobile"
      | "both"
  ) => void
}

export default function PreviewToolbar({

  previewLayout,

  setPreviewLayout

}: Props) {

  return (

    <div className="flex gap-2">

      <button
        type="button"

        onClick={() =>
          setPreviewLayout("desktop")
        }

        className={
          previewLayout === "desktop"
            ? "bg-zinc-800 text-white"
            : ""
        }
      >
        Desktop
      </button>

      <button
        type="button"

        onClick={() =>
          setPreviewLayout("mobile")
        }

        className={
          previewLayout === "mobile"
            ? "bg-zinc-800 text-white"
            : ""
        }
      >
        Mobile
      </button>

      <button
        type="button"

        onClick={() =>
          setPreviewLayout("both")
        }

        className={
          previewLayout === "both"
            ? "bg-zinc-800 text-white"
            : ""
        }
      >
        Both
      </button>

    </div>
  )
}