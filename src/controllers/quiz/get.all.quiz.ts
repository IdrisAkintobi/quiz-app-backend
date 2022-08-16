import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Quiz } from "../../model/quiz.model";
import { validateUrl } from "../../utils/validators/queryAndParamsValidator";

//Display all published quiz
const getAllQuiz = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = validateUrl(req);
  const options = {
    page: page || 1,
    limit: limit || 10,
    sort: { createdAt: -1 },
    populate: { path: "author", select: "email -_id" },
    select: ["-__v"],
  };

  const quiz = await Quiz.paginate({ isPublished: true }, options);
  if (!quiz.docs.length) {
    throw new Error("Not found");
  }
  const { totalDocs, prevPage, nextPage, docs } = quiz;
  res.status(200).json({ data: { docs, totalDocs, prevPage, nextPage } });
});

export { getAllQuiz };
