import { useState } from "react"

type Params = {
    content: string
    onChange: (value: string) => void
    setSaveStatus: (
      status: "saved" | "saving" | "unsaved"
    ) => void
}

export const useHistory = ({
    content,
    onChange,
    setSaveStatus
}: Params) => {

  const [history, setHistory] = useState<string[]>([content])
  const [historyIndex, setHistoryIndex] = useState(0)

  const updateContent = (value: string) => {

    onChange(value)

    const newHistory =
      history.slice(
        0,
        historyIndex + 1
      )

      newHistory.push(value)
      setHistory(newHistory)
      setHistoryIndex(
        newHistory.length - 1
      )
      setSaveStatus("unsaved")
  }
  // UNDO
  const undo = () => {
    if (historyIndex <= 0) return

    const previousIndex = historyIndex - 1

    setHistoryIndex(previousIndex)

    onChange(
      history[previousIndex]
    )
  } 

// REDO
  const redo = () => {
    if ( historyIndex >= history.length - 1 ) return

    const nextIndex = historyIndex + 1

    setHistoryIndex(nextIndex)

    onChange(
      history[nextIndex]
    )
  }

  return {
    updateContent,
    undo,
    redo
  }
}

