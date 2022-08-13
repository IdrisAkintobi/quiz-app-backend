import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const errorHandlerMiddleware = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  //Set message and status code
  let message = err.message || "Something went wrong";
  let statusCode = res.statusCode || 500;
  if (statusCode === 200) statusCode = 400;

  if (err.name === "UnauthorizedError") {
    message = "Invalid token";
    statusCode = 401;
  }

  if (err.code === 11000) {
    let key = Object.keys(err.keyValue)[0];
    message = `${key} field has to be unique`;
  }

  if (err instanceof ZodError) {
    message = {};
    err.issues.map((i) => (message[i.path[0]] = i.message));
  }

  res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
