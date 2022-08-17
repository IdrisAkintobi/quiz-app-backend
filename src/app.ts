import "dotenv/config";
import morgan from "morgan";
import helmet from "helmet";
import user from "./routes/user.auth.route";
import quiz from "./routes/quiz.route";
import express, { json } from "express";
import { expressjwt as jwt } from "express-jwt";
import pageNotFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";

//Instantiate app server
const app = express();

//Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(json());
app.use(
  jwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ["HS256"],
  }).unless({ path: ["/api/user/signup", "/api/user/login", "/"] })
);

//Routes
app.get("/", (_, res) => res.json({ message: "Connected" }));
app.use("/api/user", user);
app.use("/api/quiz", quiz);

// Error handlers
app.use(pageNotFound);
app.use(errorHandler);

export default app;
