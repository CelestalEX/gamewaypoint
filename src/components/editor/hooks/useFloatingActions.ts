type Params = {
  handleWrapSelection: (
    before: string,
    after?: string
  ) => void

  handleInsertAtCursor: (
    text: string
  ) => void

  handleToggleLinePrefix: (
    text: string
  ) => void

  handleRemoveLineFormatting: () => void
}

export const useFloatingToolbarActions = ({
  handleWrapSelection,
  handleInsertAtCursor,
  handleToggleLinePrefix,
  handleRemoveLineFormatting
}: Params) => {

  const runAndRefresh = (
    callback: () => void
  ) => {
    callback()

  }

  return {

    onBold: () =>
      runAndRefresh(() =>
        handleWrapSelection("**")
    ),

    onItalic: () =>
      runAndRefresh(() => 
        handleWrapSelection("*")
    ),
      

    onCode: () =>
      runAndRefresh(() =>
        handleWrapSelection("`")
    ),

    onLink: () =>
      runAndRefresh(() => 
        handleWrapSelection(
        "[",
        "](https://)"
    )), 
    
    onNormal: () =>
      handleRemoveLineFormatting(),

    onHeading1: () =>
      handleToggleLinePrefix("# "),

    onHeading2: () =>
      handleToggleLinePrefix("## "),

    onWarning: () =>
      handleInsertAtCursor(
`> [!WARNING]
> `
      ),

    onBulletList: () =>
      handleToggleLinePrefix("- "),

    onNumberedList: () =>
      handleToggleLinePrefix("1. ")
  }
}