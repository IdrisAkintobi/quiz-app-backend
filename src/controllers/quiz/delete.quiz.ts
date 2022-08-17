import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { startSession } from "mongoose";
import { Quiz } from "../../model/quiz.model";
import { Question } from "../../model/question.model";
import { validateUrl } from "../../utils/validators/queryAndParamsValidator";
import { deleteRedisQuiz } from "../../utils/delete.redis.quiz";

const deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
  const { id } = validateUrl(req);
  const quiz = await Quiz.findById(id);

  if (!quiz) {
    throw new Error("Not found");
  }

  if (quiz.author != req.auth.id) {
    res.status(403);
    throw new Error("You are not authorized to delete this quiz");
  }

  // Create a new session & start a transaction
  const session = await startSession();
  session.startTransaction();

  try {
    await quiz.delete({ session });
    await Question.deleteMany({ quiz: id }, { session });
    // commit transaction, delete redis cache & close session
    await Promise.all([session.commitTransaction(), deleteRedisQuiz(id!)])
    session.endSession();
  } catch (error) {
    // abort transaction & close session
    await session.abortTransaction();
    session.endSession();
    res.status(400);
    throw new Error("Quiz deletion failed");
  }

  res.status(200).json({ message: "Quiz successfully deleted" });
});

export { deleteQuiz };
