import { z } from "zod";

const questionValidator = z
  .object({
    question: z.string(),
    answer: z.array(z.string()).min(1).max(5),
    options: z.array(z.string()).min(2).max(5),
    type: z.enum(["singleAns", "multipleAns"]),
  })
  .refine((data) => data.options.length > data.answer.length, {
    message: "Options must be more than answer",
    path: ["options"],
  })
  .refine(
    (data) =>
      data.type === "singleAns"
        ? data.answer.length === 1
        : data.type === "multipleAns"
        ? data.answer.length > 1
        : false,
    {
      message: "Type of answer must correspond",
      path: ["type"],
    }
  );

const CreateQuizValidator = z.object({
  title: z.string().min(3).max(50),
  isPublished: z.boolean().default(false),
  questions: z.array(questionValidator),
});

export { CreateQuizValidator, questionValidator };
