import { Question } from "../model/question.model";

interface Answers {
  [key: string]: string[];
}

async function getAnswer(quizId: string) {
  const answers: Answers = {};
  const questions = await Question.find({ quiz: quizId });
  questions.map((Question) => {
    answers[Question._id] = Question.answer;
  });
  return answers;
}

async function getSolution(quizId: string) {
  const answers: Answers[] = [];
  const questions = await Question.find({ quiz: quizId });
  questions.map((Question) => {
    const subObj: Answers = {};
    subObj["id"] = Question._id;
    subObj["answer"] = Question.answer;
    answers.push(subObj);
  });
  return answers;
}

export { getAnswer, getSolution };
