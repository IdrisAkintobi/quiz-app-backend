import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Quiz } from "../../model/quiz.model";
import { Question } from "../../model/question.model";
import { validateUrl } from "../../utils/validators/queryAndParamsValidator";

const displayQuiz = asyncHandler(async (req: Request, res: Response) => {
  const { id } = validateUrl(req);
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    throw new Error("Not found");
  }

  const questions = await Question.find({ quiz: id }, [
    "-__v",
    "-quizId",
    "-answer",
  ]);
  res.status(200).json({ data: { title: quiz.title, questions } });
});

export { displayQuiz };
