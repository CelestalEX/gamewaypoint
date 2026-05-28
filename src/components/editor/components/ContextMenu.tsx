import type { ContextSection } from "../types/contextMenu"

type Props = {

  visible: boolean

  position: {
    x: number
    y: number
  }

  actions: ContextSection[]

  onClose: () => void
}

export default function ContextMenu({
  visible,
  position,
  actions,
  onClose
}: Props) {

  if (!visible) return null

  return (

    <div
      className="fixed z-50 rounded-2xl border border-zinc-800 bg-white p-2 shadow-2xl"

      style={{
        top: position.y,
        left: position.x
      }}
    >

      {actions.map((section) => (

        <div
          key={section.section}
          className="mb-2"
        >

          <p className="px-3 py-1 text-sm font-bold text-zinc-500">
            {section.section}
          </p>

          {section.items.map((item) => (

            <button
              key={item.label}

              type="button"

              onClick={() => {
                item.action()
                onClose()
              }}

              className="w-full rounded-lg px-3 py-2 text-left hover:bg-zinc-100"
            >

              {item.label}

            </button>
          ))}

        </div>
      ))}

    </div>
  )
}