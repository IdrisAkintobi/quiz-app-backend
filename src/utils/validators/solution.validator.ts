import { z } from "zod";

const SolutionValidator = z.object({
  solution: z
    .array(
      z.object({
        id: z.string(),
        answer: z.array(z.string()).max(5),
      })
    )
    .length(10),
});

export { SolutionValidator };
