import type { SlashCommand } from "../types/slash"

type Props = {
  visible: boolean

  position: {
    top: number
    left: number
  }

  commands: SlashCommand[]

  selectedIndex: number

  onSelect: (
    value: string
  ) => void
}

export default function SlashMenu({
    visible,
    position,
    commands,
    selectedIndex,
    onSelect
}: Props){
  
  if (!visible || commands.length === 0) return null

  return (
    <div
      className="absolute z-50 w-64 rounded-xl border border-zinc-800 bg-white p-2 shadow-2xl"
      style={{
        top: position.top,
        left: position.left
      }}
    >
        {
          commands.map(
            (command, index) => (

              <button
                key={command.label}
                type="button"
                onClick={() => {
                  onSelect(command.value)
                }}
                className={`
                  w-full rounded-lg px-3 py-2 text-left transition
                  ${
                    index === selectedIndex
                      ? "bg-zinc-800 text-white"
                      : "hover:bg-zinc-800 hover:text-white"
                    }
                `}
                >

                  {command.label}

                </button>
              )
            )}        
    </div>
  )
}

//  USAGE
//<ContextMenu
//  visible={contextMenu.visible}
//  x={contextMenu.x}
//   y={contextMenu.y}
//   sections={contextActions}
//   onClose={() =>
//     setContextMenu({
//       visible: false,
//       x: 0,
//       y: 0
//     })
//   }
// />