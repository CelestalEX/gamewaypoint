type Props = {
  recoveredDraft: string | null

  onRestore: () => void
  onDiscard: () => void
}

export default function DraftRecoveryBanner({
  recoveredDraft,
  onRestore,
  onDiscard
}: Props) {

  if (!recoveredDraft)
    return null

  return (

    <div className="rounded-xl border border-yellow-500 bg-yellow-500/10 p-4">

      <p className="font-bold">
        Recovered unsaved draft
      </p>

      <div className="mt-3 flex gap-3">

        <button
          type="button"
          onClick={onRestore}
          className="rounded-lg bg-yellow-500 px-4 py-2 text-black"
        >
          Restore
        </button>

        <button
          type="button"
          onClick={onDiscard}
          className="rounded-lg border px-4 py-2"
        >
          Discard
        </button>

      </div>

    </div>
  )
}