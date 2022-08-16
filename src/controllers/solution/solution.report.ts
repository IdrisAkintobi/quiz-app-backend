import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { QuizSolution } from "../../model/quiz.solutions.model";
import { validateUrl } from "../../utils/validators/queryAndParamsValidator";

const getSolutionsReport = asyncHandler(async (req: Request, res: Response) => {
  const user = req.auth.id;
  const { page, limit } = validateUrl(req);
  const options = {
    page: page || 1,
    limit: limit || 10,
    sort: { createdAt: -1 },
    select: ["-__v", "-_id", "-author", "-user", "-updatedAt"],
  };
  const QuizReport = await QuizSolution.paginate({ user }, options);
  if (!QuizReport.docs.length) {
    throw new Error("Not found");
  }
  const { totalDocs, prevPage, nextPage, docs } = QuizReport;
  res.status(200).json({ data: docs, totalDocs, prevPage, nextPage });
});

export { getSolutionsReport };
