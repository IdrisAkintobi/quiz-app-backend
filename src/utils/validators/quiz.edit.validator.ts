import { z } from "zod";

const quizEditValidator = z
  .object({
    title: z.string().min(3).max(50),
    isPublished: z.boolean(),
  })
  .partial()
  .refine(
    (data) => data.title || data.isPublished,
    "title or isPublished is required"
  );

export { quizEditValidator };
