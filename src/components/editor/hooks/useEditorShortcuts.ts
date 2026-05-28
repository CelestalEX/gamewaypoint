import { KeyboardEvent } from "react"

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
}

export const useEditorShortcuts = ({
  undo,
  redo,
  showSlashMenu,
  filteredCommands,
  selectedCommand,
  setSelectedCommand,
  insertSlashCommand,
  closeSlashMenu
}: Props) => {
  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    
    // REDO
    if(
      (e.ctrlKey || e.metaKey) &&
      e.key === "y"
    ){
      e.preventDefault()
      redo()
      return
    }

    // UNDO
    if(
      (e.ctrlKey || e.metaKey) &&
      e.key === "z"
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


    // DOWN
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

    // UP
    if (e.key === "ArrowUp"){
      e.preventDefault()

      setSelectedCommand((prev) =>
        Math.max(prev - 1, 0)
      )

      return
    }

    // ENTER
    if (e.key === "Enter"){
      e.preventDefault()

      const command = filteredCommands[selectedCommand]

      if(!command) return

      insertSlashCommand(command.value)

      return
    }

    // ESCAPE 
    if (e.key === "Escape"){
      closeSlashMenu()

      return
    }

  }

  return{
    handleKeyDown
  }
}