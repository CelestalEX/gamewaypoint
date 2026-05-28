"use client"

import {
  Bold,
  Italic,
  Strikethrough,
  Code2,
  Link2,
  List
} from "lucide-react"

import ToolbarButton from "./ToolbarButton"
import ToolbarDivider from "./ToolbarDivider"
import ToolbarDropdown from "./ToolbarDropdown"

type ToolbarActions = {
  onBold: () => void
  onItalic: () => void
  onStrike?: () => void
  onCode: () => void
  onLink: () => void
  onNormal: () => void
  onHeading1?: () => void
  onHeading2?: () => void
  onWarning?: () => void
  onCodeBlock?: () => void

  onBulletList?: () => void
  onNumberedList?: () => void
  onChecklist?: () => void
}

type Props = {
  visible: boolean

  position: {
    top: number
    left: number
  }

  formatting: {
    bold: boolean
    italic: boolean
    code: boolean
    link: boolean
  }

  actions: ToolbarActions

  blockType: string
}



export default function FloatingToolbar({
  visible,
  position,
  formatting,
  actions,
  blockType
}: Props) {

  if (!visible) return null

  return (
    <div
      className="
        fixed z-50
        flex items-center gap-1

        rounded-xl
        border border-zinc-700
        bg-zinc-900/95
        px-2 py-1.5

        shadow-2xl
        backdrop-blur-xl
      "
      style={{
        top: position.top,
        left: position.left
      }}
    >

      {/* DROPDOWN */}
    
      <ToolbarDropdown
        label={blockType}
        items={[
          {
            label: "Normal",
            onClick: () =>
              actions.onNormal?.()
          },
          {
            label: "Heading 1",
            onClick: () =>
              actions.onHeading1?.()
          },

          {
            label: "Heading 2",
            onClick: () =>
              actions.onHeading2?.()
          },

          {
            label: "Warning",
            onClick: () =>
              actions.onWarning?.()
          },

          {   
            label: "Code Block",
            onClick: () =>
              actions.onCodeBlock?.()
          }
        ]}
      />
      

      {/* TEXT STYLE */}

      <ToolbarButton
        icon={<Bold size={16} />}
        onClick={actions.onBold}
        active={formatting.bold}
      />

      <ToolbarButton
        icon={<Italic size={16} />}
        onClick={actions.onItalic}
        active={formatting.italic}
      />

      {
        actions.onStrike && (
          <ToolbarButton
            icon={<Strikethrough size={16} />}
            onClick={actions.onStrike}
          />
        )
      }

      <ToolbarDivider />

      {/* INLINE */}

      <ToolbarButton
        icon={<Code2 size={16} />}
        onClick={actions.onCode}
        active={formatting.code}
      />

      <ToolbarButton
        icon={<Link2 size={16} />}
        onClick={actions.onLink}
        active={formatting.link}
      />

      <ToolbarDivider />

      {/* LIST */}

      <ToolbarDropdown
        label="List"
        icon={<List size={16} />}
        items={[
          {
            label: "Bullet List",
            onClick: () =>
              actions.onBulletList?.()
          },

          {
            label: "Numbered List",
            onClick: () =>
              actions.onNumberedList?.()
          },

          {
            label: "Checklist",
            onClick: () =>
              actions.onChecklist?.()
          }
        ]}
/>

    </div>
  )
}