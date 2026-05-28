import { useState, useEffect } from "react";
import { autosaveGuide } from "../services/autosaveGuide";
import { AUTOSAVE_DELAY } from "../constants/editor";

type Params = {
    guideId?: number
    content: string
}

export const useAutosave = ({
    guideId,
    content
}: Params) => {

  const [saveStatus, setSaveStatus] =
    useState<
      "saved" |
      "saving" |
      "unsaved"
    >("saved")

    // AUTOSAVE
      useEffect(() => {
        
        if (!guideId) return
    
        if (saveStatus !== "unsaved")
          return
    
        const timeout = setTimeout(
          async () => {
            setSaveStatus("saving")
    
            try{
              await fetch(
                `/api/guides/${guideId}/autosave`
                ,{
                method: "PATCH",
                headers: {
                  "Content-Type":
                    "application/json"
                },
    
                body: JSON.stringify({
                  content
                })
                }
              )
              setSaveStatus("saved")
            } catch {
              setSaveStatus("unsaved")
            }
          },
          AUTOSAVE_DELAY
        )
    
        return () =>
          clearTimeout(timeout)
    
      }, [content, guideId, saveStatus])

  return {
    saveStatus,
    setSaveStatus
  }
}

//  USAGE
//  const {
//     saveStatus,
//     setSaveStatus
//  } = useAutosave({
//     guideID,
//     content  
//  })
//