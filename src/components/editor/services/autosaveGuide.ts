export const autosaveGuide =
  async (
    guideId: number,
    content: string
  ) => {

    const response = await fetch(
      `/api/guides/${guideId}/autosave`,
      {
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

    if (!response.ok) {
      throw new Error(
        "Autosave failed"
      )
    }

    return response.json()
  }