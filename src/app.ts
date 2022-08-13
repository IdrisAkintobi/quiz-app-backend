import "dotenv/config";
import morgan from "morgan";
import express, { json } from "express";
import pageNotFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";
import user from "./routes/user.route";
import { expressjwt as jwt } from "express-jwt";

//Instantiate app server
const app = express();

//Middlewares
app.use(json());
app.use(morgan("dev"));
app.use(
  jwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ["HS256"],
  }).unless({ path: ["/api/user/signup", "/api/user/login"] })
);

//Routes
app.get("/", (_, res) => res.json({ message: "Connected" }));
app.use("/api/user", user);

// Error handlers
app.use(pageNotFound);
app.use(errorHandler);

export default app;
