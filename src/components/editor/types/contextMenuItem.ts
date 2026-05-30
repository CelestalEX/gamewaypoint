import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"

export type ContextMenuItem = {
  label: string
  icon?: LucideIcon
  shortcut?: string

  danger?: boolean
  disabled?: boolean

  onClick?: () => void

  submenu?: ContextMenuItem[]

  separator?: boolean
}