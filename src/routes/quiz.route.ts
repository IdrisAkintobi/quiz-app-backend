import { Router } from "express";
import { authorize } from "../middlewares/authorize.user";
import { createQuiz } from "../controllers/quiz/create.quiz";
import { displayQuiz } from "../controllers/quiz/display.quiz";
import { getAllQuiz } from "../controllers/quiz/get.all.quiz";
import { submitSolution } from "../controllers/solution/submit";
import { getSolutionsReport } from "../controllers/solution/solution.report";
import { editQuestion } from "../controllers/quiz/edit.question";
import { editQuiz } from "../controllers/quiz/edit.quiz";
import { getQuizSolutionsReport } from "../controllers/solution/quiz.solution.report";
import { deleteQuiz } from "../controllers/quiz/delete.quiz";

const router = Router();

router.post("/create-quiz", authorize, createQuiz);
router.get("/display-quiz/:id", authorize, displayQuiz);
router.get("/list-all-quiz", authorize, getAllQuiz);
router.put("/edit-question/:id", authorize, editQuestion);
router.patch("/edit-quiz/:id", authorize, editQuiz);
router.post("/submit-solution/:id", authorize, submitSolution);
router.get("/my-solutions", authorize, getSolutionsReport);
router.get("/my-quiz-solutions", authorize, getQuizSolutionsReport);
router.delete("/delete-quiz/:id", authorize, deleteQuiz);

export default router;
