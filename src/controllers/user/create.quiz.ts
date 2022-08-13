import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const createQuiz = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ data: req.auth.email });
});

export { createQuiz };
