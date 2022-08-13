import { Router } from "express";
import { authorize } from "../middlewares/authorize.user";
import { signup, login } from "../controllers/user/auth";
import { createQuiz } from "../controllers/user/create.quiz";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/create-quiz", authorize, createQuiz);

export default router;
