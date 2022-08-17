import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Quiz } from "../../model/quiz.model";
import { Question } from "../../model/question.model";
import { validateUrl } from "../../utils/validators/queryAndParamsValidator";
import { redisClient } from "../../db/connectDB";

const displayQuiz = asyncHandler(async (req: Request, res: Response) => {
  const { id } = validateUrl(req);
  const redisQuizKey = `quiz:${id}`;
  const redisQuestionKey = `questions:${id}`;

  const RedisQuiz = await redisClient.get(redisQuizKey);
  const RedisQuestion = await redisClient.get(redisQuestionKey);

  if (RedisQuiz && RedisQuestion) {
    const quiz = JSON.parse(RedisQuiz);
    const questions = JSON.parse(RedisQuestion);
    res.status(200).json({ data: { title: quiz.title, questions } });
  } else {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      throw new Error("Not found");
    }
    //save quiz in redis
    await redisClient.set(redisQuizKey, JSON.stringify(quiz), "EX", 21600);

    const questions = await Question.find({ quiz: id }, [
      "-__v",
      "-quiz",
      "-answer",
    ]);
    //save questions in redis
    await redisClient.set(redisQuestionKey, JSON.stringify(questions), "EX", 21600);
    res.status(200).json({ data: { title: quiz.title, questions } });
  }
});

export { displayQuiz };
