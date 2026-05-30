"use client"

// REACT

import { useRef, useEffect, useState } from "react"

// PREVIEW

import MarkdownPreview from "@/components/editor/preview/MarkdownPreview"

// CONFIG

import { createContextActions } from "@/components/editor/config/createContextActions"
// import { slashCommands } from "./config/slashCommands"

// HELPERS

import { insertAtCursor } from "@/components/editor/helpers/insertAtCursor"
import { wrapSelection } from "@/components/editor/helpers/wrapSelection"
// import { getCaretCoordinates } from "@/components/editor/helpers/getCaretCoordinates"
import { getSelectionFormatting } from "./helpers/getSelectionFormating"

// HOOKS

import { useAutosave } from "./hooks/useAutosave"
import { useClipboard } from "./hooks/useClipboard"
// import { useContextActions } from "./hooks/useContextActions"
import { useContextMenu } from "./hooks/useContextMenu"
import { useDraftRecovery } from "./hooks/useDraftRecovery"
import { useEditorShortcuts } from "./hooks/useEditorShortcuts"
import { useFloatingToolbar } from "./hooks/useFloatingToolbar"
import { useFloatingToolbarActions } from "./hooks/useFloatingActions"
import { useHistory } from "./hooks/useHistory"
import { useImageUpload } from "./hooks/useImageUpload"
// import { useSelectionToolbar } from "./hooks/useSelectionToolbar"
import { useSlashCommands } from "./hooks/useSlashCommands"
// import { useTextareaSelection } from "./hooks/useTextareaSelection"

// COMPONENTS

import ContextMenu from "./components/contextMenu/ContextMenu"
import DesktopPreview from "./components/DesktopPreview"
import DraftRecoveryBanner from "./components/DraftRecoveryBanner"
import EditorToolbar from "./components/EditorToolbar"
import FloatingToolbar from "./components/floatingToolbar/FloatingToolbar"
import MobilePreview from "./components/MobilePreview"
import PreviewToolbar from "./components/PreviewToolbar"
import SaveStatus from "./components/SaveStatus"
import SlashMenu from "./components/SlashMenu"

// TYPES 

import type { PreviewMode } from "./types/editor"
import { toggleLinePrefix } from "./helpers/toggleLinePrefix"
import { removeLineFormatting } from "./helpers/removeLinePrefix"
import { useContextActions } from "./hooks"


type Props = {
  guideId?: number
  content: string
  onChange: (value: string) => void
}

export default function MarkdownEditor({
  content,
  onChange,
  guideId
}: Props) {

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // PREVIEW MODE
  
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop")

  

  // AUTOSAVE HOOK

  const {
    saveStatus,
    setSaveStatus
  } = useAutosave({
    guideId,
    content
  })

  // HISTORY HOOK

  const {
    updateContent,
    undo,
    redo
  } = useHistory({
    content,
    onChange,
    setSaveStatus
  })

  // WRAPERS

  const handleWrapSelection = (
    beforeSyntax: string,
    afterSyntax?: string
  ) => {
    wrapSelection({
      textareaRef,
      content,
      beforeSyntax,
      afterSyntax,
      updateContent
    })
  }

  const handleInsertAtCursor = (
    text: string
  ) => {
    insertAtCursor({
      textareaRef,
      content,
      text,
      updateContent
    })
  }

  // CLIPBOARD

  const {
    copySelection,
    cutSelection,
    pasteClipboard
  } = useClipboard({
    textareaRef,
    content,
    updateContent
  })

  // CONTEXT MENU

  const {
    visible: showContextMenu,
    position: contextMenuPosition,
    openContextMenu,
    closeContextMenu,
    adjustPosition
  } = useContextMenu()

  // CONTEXT ACTIONS

  const contextActions =
    useContextActions({
      wrapSelection: handleWrapSelection,
      insertAtCursor: handleInsertAtCursor,
      copySelection,
      cutSelection,
      pasteClipboard,
      undo,
      redo
    })

  // FLOATING TOOLBAR

  const {
    formatting,
    showFloatingToolbar,
    floatingPosition,
    handleSelection,
    hideFloatingToolbar,
    toolbarLabel
  } = useFloatingToolbar({
    textareaRef,
    content
  })

  // WRAPPER FOR FLOATING DROPDOWNDS

  const handleToggleLinePrefix = (
    prefix: string
  ) => {
    toggleLinePrefix({
      textareaRef,
      content,
      prefix,
      updateContent
    })
  }

    // WRAPPER

  const handleRemoveLineFormatting = () => {
    removeLineFormatting({
      textareaRef,
      content,
      updateContent
    })
  }

  const floatingToolbarActions =
    useFloatingToolbarActions({
      handleWrapSelection,
      handleInsertAtCursor,
      handleToggleLinePrefix,
      handleRemoveLineFormatting
    })

  // SLASH COMMANDS

  const {
  showSlashMenu,
  slashPosition,
  slashQuery,
  selectedCommand,
  filteredCommands,

  setShowSlashMenu,
  setSlashQuery,
  setSelectedCommand,

  handleSlashCommand,
  insertSlashCommand
} = useSlashCommands({
  textareaRef,
  content,
  updateContent
})

  // SHORTCUTS
  
  const { handleKeyDown } =
    useEditorShortcuts({
      undo,
      redo,
      showSlashMenu,
      filteredCommands,
      selectedCommand,
      setSelectedCommand,
      insertSlashCommand,
      closeSlashMenu: () => setShowSlashMenu(false) 
    })

  // IMAGE UPLOAD

  const { uploadImage } =
    useImageUpload({
      onInsert: handleInsertAtCursor
    })
  
  // DRAFT RECOVERY

  const {
    recoveredDraft,
    restoreDraft,
    discardDraft
  } = useDraftRecovery({
    guideId,
    content,
    updateContent
  })

  const handleTextareaChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {

    const value = e.target.value

    updateContent(value)

    setSaveStatus("unsaved")

    hideFloatingToolbar()

    handleSlashCommand(value)
  }

  useEffect(() => {

  const handlePageShow = (
    event: PageTransitionEvent
  ) => {

    console.log(
      "pageshow",
      event.persisted
    )

  }

  window.addEventListener(
    "pageshow",
    handlePageShow
  )

  return () => {

    window.removeEventListener(
      "pageshow",
      handlePageShow
    )

  }

}, [])


  return (

    <div className="space-y-4">

      <EditorToolbar
        onInsert={handleInsertAtCursor}
        onImageUpload={uploadImage}
      />
      
      <PreviewToolbar 
        previewLayout={previewMode}
        setPreviewLayout={setPreviewMode}
      />

      <SaveStatus 
        status={saveStatus}
      />

      <DraftRecoveryBanner 
        recoveredDraft={recoveredDraft}
        onRestore={restoreDraft}
        onDiscard={discardDraft}
      />

      <FloatingToolbar
        visible={showFloatingToolbar}
        position={floatingPosition}
        formatting={formatting}
        actions={floatingToolbarActions}
        toolbarLabel={toolbarLabel}
      />

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 items-start">


        {/* EDITOR */}
        <div className="relative min-w-0 w-full">

          <textarea
            ref={textareaRef}
            value={content}
            spellCheck={false}
            placeholder="Write your guide here..."
            className="mt-9 w-full min-h-175 overflow-auto resize-y rounded-xl border border-zinc-800 bg-white p-6 font-mono text-sm leading-7 outline-none focus:border-blue-500"
            onChange={handleTextareaChange}
            onMouseUp={handleSelection}
            onKeyDown={handleKeyDown}
            onContextMenu={(e) => {
              console.log("context menu")
              e.preventDefault()
              openContextMenu(
                e.clientX,
                e.clientY
              )
            }}    
            onPaste={async (e) => {
              const items = e.clipboardData.items

              for (const item of items) {
                if(item.type.startsWith("image/")
                ){
                  e.preventDefault()
                  const file = item.getAsFile()
                  if(!file) return
                  await uploadImage(file)
                }
              }
            }}
            onDrop={async (e) => {
              e.preventDefault()
              const files = Array.from(e.dataTransfer.files)
              const image = files.find((file) => file.type.startsWith("image/"))
              if(!image) return
              await uploadImage(image)
            }}
            onDragOver={(e) => {
              e.preventDefault()
            }}    
            onFocus={() =>
              console.log("focus")
            }      
            onBlur={() =>
              console.log("blur")
            }
          />

          <SlashMenu 
            visible={showSlashMenu}
            position={slashPosition}
            commands={filteredCommands}
            selectedIndex={selectedCommand}
            onSelect={insertSlashCommand}
          />

          <ContextMenu 
            visible={showContextMenu}
            position={contextMenuPosition}
            actions={contextActions}
            onClose={closeContextMenu}
            onMeasure={adjustPosition}
          />


        </div>

        {/* PREVIEW */}
        <div className="space-y-8">
          
          {/* DESKTOP */}
          {
            (
              previewMode === "desktop" ||
              previewMode === "both"
            ) && (

              <DesktopPreview 
                content={content}
              />
            )
          }

          {/* MOBILE */}
          {
            (
              previewMode === "mobile" ||
              previewMode === "both"
            ) && (

              <MobilePreview 
                content={content}
              />
            
            )
          }

        </div>
      </div>
    </div>
  )
}