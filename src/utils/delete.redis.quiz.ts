import { redisClient } from "../db/connectDB";

const deleteRedisQuiz = async (quizId: string) => {
  const redisQuizKey = `quiz:${quizId}`;
  const redisQuestionKey = `questions:${quizId}`;
  return Promise.all([
    redisClient.del(redisQuizKey),
    redisClient.del(redisQuestionKey),
  ]);
};

export { deleteRedisQuiz };