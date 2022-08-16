import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { startSession } from "mongoose";
import { Quiz } from "../../model/quiz.model";
import { Question } from "../../model/question.model";
import { CreateQuizValidator } from "../../utils/validators/create.validator";

const createQuiz = asyncHandler(async (req: Request, res: Response) => {
  const author = req.auth?.id;
  const { title, isPublished, questions } = CreateQuizValidator.parse(req.body);

  const quizExists = await Quiz.exists({ title, author });
  if (quizExists) {
    res.status(409);
    throw new Error("Quiz already exists");
  }
  const quiz = Quiz.build({ author, title, isPublished });
  //@ts-ignore
  questions.map((questions) => (questions["quiz"] = quiz.id));

  // Create a new session & start a transaction
  const session = await startSession();
  session.startTransaction();
  try {
    await Promise.all([
      quiz.save({ session }),
      Question.insertMany(questions, { session }),
    ]);
    // commit transaction & close session
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    // abort transaction & close session
    await session.abortTransaction();
    session.endSession();
    res.status(400);
    throw new Error("Quiz creation failed");
  }
  const { __v, ...data } = quiz.toJSON();
  res.status(201).json({ data });
});

export { createQuiz };
