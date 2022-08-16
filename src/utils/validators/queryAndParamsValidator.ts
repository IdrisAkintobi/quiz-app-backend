import { z, ZodError } from "zod";
import { Request } from "express";

const queryAndParamsValidator = z
  .object({
    page: z.string().transform(Number),
    limit: z.string().transform(Number),
    id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  })
  .partial();

//TODO: handle id error

const validateUrl = (req: Request) => {
  const { query, params } = req;
  try {
    return queryAndParamsValidator.parse({ ...query, ...params });
  } catch (e: any) {
    throw new Error("Not found");
  }
};

export { validateUrl };
