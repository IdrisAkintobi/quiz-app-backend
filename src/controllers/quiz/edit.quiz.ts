import { Request, Response } from "express";
import { Quiz } from "../../model/quiz.model";
import asyncHandler from "express-async-handler";
import { quizEditValidator } from "../../utils/validators/quiz.edit.validator";
import { validateUrl } from "../../utils/validators/queryAndParamsValidator";

const editQuiz = asyncHandler(async (req: Request, res: Response) => {
  const { id } = validateUrl(req);
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    throw new Error("Not found");
  }
  if (quiz.isPublished) {
    res.status(400);
    throw new Error("Published quiz cannot be edited");
  }
  const { title, isPublished } = quizEditValidator.parse(req.body);
  quiz.title = title || quiz.title;
  quiz.isPublished = isPublished || quiz.isPublished;
  await quiz.save();

  const { __v, author, id: _, ...data } = quiz.toJSON();
  res.status(200).json({ data });
});

export { editQuiz };
