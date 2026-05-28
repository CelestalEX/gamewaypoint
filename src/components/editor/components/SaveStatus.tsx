type Props = {
  status:
    | "saved"
    | "saving"
    | "unsaved"
}

export default function SaveStatus({
  status
}: Props) {

  return (

    <div className="text-sm text-zinc-500">

      {
        status === "saving" &&
        "Saving..."
      }

      {
        status === "saved" &&
        "Saved"
      }

      {
        status === "unsaved" &&
        "Unsaved changes"
      }

    </div>
  )
}