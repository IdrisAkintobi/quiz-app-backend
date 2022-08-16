import { User } from "../../model/user";
import genToken from "../../utils/gen.token";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  SignUpValidator,
  SignInValidator,
} from "../../utils/validators/auth.validator";

const signup = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = SignUpValidator.parse(req.body);
  const user = User.build({ email, password });
  await user.save();
  res.status(201).json({ message: "User created successfully" });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = SignInValidator.parse(req.body);
  const user = await User.findOne({ email });
  if (!user || !(await user.validatePassword(password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({ token: genToken(user._id) });
});

export { signup, login };
