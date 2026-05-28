import { useState, useEffect} from "react"

type Params = {
    guideId?: number
    content: string
    updateContent: (value: string) => void
}

export const useDraftRecovery = ({
    guideId,
    content,
    updateContent
}: Params) => {

  const [recoveredDraft, setRecoveredDraft] = useState<string | null>(null)
  const [dismissedDraft, setDismissedDraft] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const storageKey = `guide-draft-${guideId ?? "new"}`
    
    // LOCAL AUTOSAVE

    useEffect(() => {

      if (!isInitialized) return

      localStorage.setItem(
        storageKey,
        content
      )
    }, [content, storageKey, isInitialized])

      
    // RECOVER SAVE

    useEffect(() => {

      const localDraft = localStorage.getItem(storageKey)

      if (
        localDraft &&
        localDraft !== content &&
        localDraft !== dismissedDraft
      ) {

        setRecoveredDraft(localDraft)

      }

      setIsInitialized(true)

    }, [])

    const restoreDraft = () => {
      if (!recoveredDraft) return

      updateContent(recoveredDraft)

      localStorage.removeItem(storageKey)

      setDismissedDraft(null)
      setRecoveredDraft(null)
    }

    const discardDraft = () => {
        localStorage.removeItem(storageKey)

        setDismissedDraft(null)
        setRecoveredDraft(null)
    }

  return {
    recoveredDraft,
    restoreDraft,
    discardDraft
  }
}

