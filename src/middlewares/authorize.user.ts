import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../model/user";

const authorize = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.auth?.id;
    const user = await User.findById(token);
    if (!user) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    req.auth!.email = user.email;
    next();
  }
);

export { authorize };
