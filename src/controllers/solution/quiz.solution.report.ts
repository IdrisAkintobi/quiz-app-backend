import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { QuizSolution } from "../../model/quiz.solutions.model";
import { validateUrl } from "../../utils/validators/queryAndParamsValidator";

const getQuizSolutionsReport = asyncHandler(
  async (req: Request, res: Response) => {
    const author = req.auth.id;
    const { page, limit } = validateUrl(req);
    const options = {
      page: page || 1,
      limit: limit || 10,
      sort: { quiz: 1, createdAt: -1 },
      populate: { path: "user", select: "email -_id" },
      select: ["-__v", "-_id", "-author", "-updatedAt"],
    };
    const QuizReport = await QuizSolution.paginate({ author }, options);
    if (!QuizReport.docs.length) {
      throw new Error("Not found");
    }
    const { totalDocs, prevPage, nextPage, docs } = QuizReport;
    res.status(200).json({ data: docs, totalDocs, prevPage, nextPage });
  }
);

export { getQuizSolutionsReport };
