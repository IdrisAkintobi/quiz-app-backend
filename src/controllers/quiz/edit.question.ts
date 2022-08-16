import { Request, Response } from "express";
import { Quiz } from "../../model/quiz.model";
import { Question } from "../../model/question.model";
import { questionValidator } from "../../utils/validators/create.validator";
import asyncHandler from "express-async-handler";
import { validateUrl } from "../../utils/validators/queryAndParamsValidator";

const editQuestion = asyncHandler(async (req: Request, res: Response) => {
  const author = req.auth.id;
  const { id } = validateUrl(req);

  const questionData = await Question.findById(id);
  if (!questionData) {
    throw new Error("Not found");
  }

  const isEditable = await Quiz.findOne({
    id: questionData.quiz,
    isPublished: false,
    author,
  });
  if (!isEditable) {
    res.status(400);
    throw new Error("Question cannot be edited");
  }

  const data = questionValidator.parse(req.body);
  questionData.set(data);
  await questionData.save();

  const { id: _, __v, ...updatedQuestion } = questionData.toJSON();
  res.status(200).json({ data: updatedQuestion });
});

export { editQuestion };
