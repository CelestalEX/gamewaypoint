import { KeyboardEvent } from "react"
import type { EditorActions } from "../types/editorActions"

type Command = {
  label: string
  value: string
}

type Props = {
  undo: () => void
  redo: () => void

  showSlashMenu: boolean

  filteredCommands: Command[]

  selectedCommand: number

  setSelectedCommand:
    React.Dispatch<
      React.SetStateAction<number>
    >

  insertSlashCommand: (
    value: string
  ) => void

  closeSlashMenu: () => void

  editorActions: EditorActions

}

export const useEditorShortcuts = ({
  undo,
  redo,
  showSlashMenu,
  filteredCommands,
  selectedCommand,
  setSelectedCommand,
  insertSlashCommand,
  closeSlashMenu,
  editorActions
}: Props) => {
  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {

    const ctrl = e.ctrlKey || e.metaKey

    if (!ctrl) return

    
    // FORMATTING SHORTCUTS
    switch (e.key.toLowerCase()) {
      case "b":
        console.log("shortcut bold")
        e.preventDefault()
        editorActions.onBold()
        break
      
      case "i":
        e.preventDefault()
        editorActions.onItalic()
        break

      case "k":
        e.preventDefault()
        editorActions.onLink()
        break

      case "e":
        e.preventDefault()
        editorActions.onCode()
        break
    }

    // CTRL + SHIFT SHORTCUTS
    if( ctrl && e.shiftKey) {

      switch (e.key){
        case "1": 
          e.preventDefault()
          editorActions.onHeading1()
          break

        case "2":
          e.preventDefault()
          editorActions.onHeading2()
          break

        case "7":
          e.preventDefault()
          editorActions.onNumberedList()
          break

        case "8":
          e.preventDefault()
          editorActions.onBulletList()
          break

        case "W":
        case "w":
          e.preventDefault()
          editorActions.onWarning()
          break
      }
    }
    
    // REDO
    if(
      ctrl &&
      e.shiftKey &&
      e.key.toLowerCase() === "y"
    ){
      e.preventDefault()
      redo()
      return
    }

    // UNDO
    if(
      ctrl &&
      e.shiftKey &&
      e.key.toLowerCase() === "z"
    ){
      e.preventDefault()
      undo()
      return
    }

    // SLASH MENU
    if(
      !showSlashMenu ||
      filteredCommands.length === 0
    ){
      return
    }


    // DOWN FOR SLASH MENU
    if (e.key === "ArrowDown"){
      e.preventDefault()

      setSelectedCommand((prev) => 
        Math.min(
          prev + 1,
          filteredCommands.length - 1
        )
      )

      return
    }

    // UP FOR SLASH MENU
    if (e.key === "ArrowUp"){
      e.preventDefault()

      setSelectedCommand((prev) =>
        Math.max(prev - 1, 0)
      )

      return
    }

    // ENTER FOR SLASH MENU
    if (e.key === "Enter"){
      e.preventDefault()

      const command = filteredCommands[selectedCommand]

      if(!command) return

      insertSlashCommand(command.value)

      return
    }

    // ESCAPE FOR SLASH MENU
    if (e.key === "Escape"){
      closeSlashMenu()

      return
    }

  }

  return{
    handleKeyDown
  }
}