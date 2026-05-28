export type SaveStatus =
  | "saved"
  | "saving"
  | "unsaved"

export type PreviewMode =
  | "desktop"
  | "mobile"
  | "both"

export type Position = {
  top: number
  left: number
}

export type ContextMenuState = {
  visible: boolean
  x: number
  y: number
}