import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { SolutionValidator } from "../../utils/validators/solution.validator";
import { getAnswer } from "../../utils/get.answers";
import difference from "lodash/difference";
import intersection from "lodash/intersection";
import { QuizSolution } from "../../model/quiz.solutions.model";
import { Quiz } from "../../model/quiz.model";
import { validateUrl } from "../../utils/validators/queryAndParamsValidator";

const submitSolution = asyncHandler(async (req: Request, res: Response) => {
  const { id } = validateUrl(req);
  const { solution } = SolutionValidator.parse(req.body);
  const quizData = await Quiz.findById(id);

  if (!quizData) {
    res.status(404);
    throw new Error("Quiz not found");
  }
  if (!quizData.isPublished) {
    res.status(403);
    throw new Error("Quiz is not published");
  }

  const author = quizData.author;
  if (author == req.auth.id) {
    res.status(403);
    throw new Error("You can't submit solution for your own quiz");
  }
  const quizSolved = await QuizSolution.findOne({
    user: req.auth.id,
    quiz: id,
  });
  if (quizSolved) {
    res.status(400);
    throw new Error("You have already solved this quiz");
  }

  const quizAnswers = await getAnswer(id!);
  const userAnswers: Record<string, number> = {};
  let totalScore = 0;
  const errors: Record<string, string> = {};
  solution.map((solution) => {
    let score = 0;
    const answerBE = quizAnswers[solution.id];
    //terminate submission if a question have no answer
    if (!answerBE) {
      res.status(500);
      throw new Error();
    }
    const bELen = answerBE.length;
    const answerFE = solution.answer;
    const fELen = answerFE.length;
    const wrongScore = bELen > 1 ? 1 / (5 - bELen) : 1;
    const correctScore = bELen > 1 ? 1 / bELen : 1;
    if (bELen === 1 && fELen > 1) {
      errors[solution.id] = "You can only select one answer";
    } else if (fELen) {
      const wrongAnswers = difference(answerFE, answerBE);
      score -= parseFloat((wrongScore * wrongAnswers.length).toFixed(3));
      const correctAnswers = intersection(answerFE, answerBE);
      score += parseFloat((correctScore * correctAnswers.length).toFixed(3));
    }
    userAnswers[solution.id] = +score.toFixed(3);
    totalScore += score;
  });
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    const quizSolution = QuizSolution.build({
      quiz: id as string,
      author,
      user: req.auth.id,
      solutions: userAnswers,
      percentage: `${totalScore * 10}%`,
    });
    await quizSolution.save();
    const { updatedAt, __v, _id, ...rest } = quizSolution.toObject();
    res.status(200).json({ data: rest });
  }
});

export { submitSolution };
