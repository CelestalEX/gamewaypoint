import { z } from "zod"

export const commentSchema = z.object({
  content: z
    .string()
    .min(3, "Comment too short")
    .max(500, "Comment too long"),

  guideId: z.number(),

  authorName: z
    .string()
    .min(2)
    .max(50)
    .optional()
})