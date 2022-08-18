import app from "../app";
import request from "supertest";
import { User } from "../model/user";
import { Quiz } from "../model/quiz.model";
import { Question } from "../model/question.model";
import { QuizSolution } from "../model/quiz.solutions.model";
import data from "./mock.data";
import { getSolution } from "../utils/get.answers";

let token1: string;
let token2: string;
let quiz: { [key: string]: string };
let questions: [{ [key: string]: string }];

it("Check all schema", () => {
  expect(User).toBeDefined();
  expect(Quiz).toBeDefined();
  expect(Question).toBeDefined();
  expect(QuizSolution).toBeDefined();
});

it("User is created", async () => {
  const responseOne = await request(app)
    .post("/api/user/signup")
    .send(data.user1)
    .expect(201);

  await request(app).post("/api/user/signup").send(data.user2).expect(201);

  const message = responseOne.body.message;
  expect(message).toBe("User created successfully");
});

it("Registered user can signin", async () => {
  const response = await request(app).post("/api/user/login").send({
    email: data.user1.email,
    password: data.user1.password,
  });
  token1 = response.body.token;
  expect(response.status).toBe(200);
});

it("Token is generated on signin", async () => {
  const response = await request(app).post("/api/user/login").send({
    email: data.user2.email,
    password: data.user2.password,
  });
  token2 = response.body.token;
  expect(token2).toBeTruthy();
});

it("User can create quiz", async () => {
  const response = await request(app)
    .post("/api/quiz/create-quiz")
    .set("Authorization", `Bearer ${token1}`)
    .send(data.quiz)
    .expect(201);
  quiz = response.body.data;
  expect(quiz).toHaveProperty("author");
  expect(quiz).toHaveProperty("title");
  expect(quiz.isPublished).toBeFalsy();
});

it("User can view quiz", async () => {
  const response = await request(app)
    .get(`/api/quiz/display-quiz/${quiz.id}`)
    .set("Authorization", `Bearer ${token1}`)
    .expect(200);
  questions = response.body.data.questions;
  expect(questions).toHaveLength(10);
});

it("User can edit quiz", async () => {
  const response = await request(app)
    .patch(`/api/quiz/edit-quiz/${quiz.id}`)
    .set("Authorization", `Bearer ${token1}`)
    .send({ title: "Edited Quiz" })
    .expect(200);
  expect(response.body.data.title).toBe("Edited Quiz");
});

it("User can edit question", async () => {
  const response = await request(app)
    .put(`/api/quiz/edit-question/${questions[0].id}`)
    .set("Authorization", `Bearer ${token1}`)
    .send(data.edit)
    .expect(200);
  const { data: rData } = response.body;
  expect(rData).toMatchObject(data.edit);
});
it("Options must be more than answer", async () => {
  const response = await request(app)
    .put(`/api/quiz/edit-question/${questions[0].id}`)
    .set("Authorization", `Bearer ${token1}`)
    .send(data.lessOpts)
    .expect(400);
  const { message } = response.body;
  expect(message.options).toBe("Options must be more than answer");
});
it("Empty strings can't be used", async () => {
  const response = await request(app)
    .put(`/api/quiz/edit-question/${questions[0].id}`)
    .set("Authorization", `Bearer ${token1}`)
    .send(data.emptyString)
    .expect(400);
  const { message } = response.body;
  expect(message.options).toBe("String must contain at least 1 character(s)");
});
it("Options must be unique", async () => {
  const response = await request(app)
    .put(`/api/quiz/edit-question/${questions[0].id}`)
    .set("Authorization", `Bearer ${token1}`)
    .send(data.unUniqueOpts)
    .expect(400);
  const { message } = response.body;
  expect(message.options).toBe("Options and answers must be unique");
});
it("Options must be unique", async () => {
  const response = await request(app)
    .put(`/api/quiz/edit-question/${questions[0].id}`)
    .set("Authorization", `Bearer ${token1}`)
    .send(data.unUniqueAns)
    .expect(400);
  const { message } = response.body;
  expect(message.options).toBe("Options and answers must be unique");
});
it("Type of answer must correspond", async () => {
  const response = await request(app)
    .put(`/api/quiz/edit-question/${questions[0].id}`)
    .set("Authorization", `Bearer ${token1}`)
    .send(data.badType)
    .expect(400);
  const { message } = response.body;
  expect(message.type).toBe("Type of answer must correspond");
});

it("User can publish quiz", async () => {
  const response = await request(app)
    .patch(`/api/quiz/edit-quiz/${quiz.id}`)
    .set("Authorization", `Bearer ${token1}`)
    .send({ isPublished: true })
    .expect(200);
  expect(response.body.data).toBeTruthy();
});

it("Author can't submit solution for own quiz", () => {
  return request(app)
    .post(`/api/quiz/submit-solution/${quiz.id}`)
    .set("Authorization", `Bearer ${token1}`)
    .send(data.solution)
    .expect(403);
});

it("User can submit solution for published quiz", async () => {
  const solution = await getSolution(quiz.id);
  const response = await request(app)
    .post(`/api/quiz/submit-solution/${quiz.id}`)
    .set("Authorization", `Bearer ${token2}`)
    .send({ solution })
    .expect(200);
  const { percentage } = response.body.data;
  expect(percentage).toBe("100%");
});

it("User can view their solutions", async () => {
  const response = await request(app)
    .get("/api/quiz/my-solutions")
    .set("Authorization", `Bearer ${token2}`)
    .expect(200);
  const { data } = response.body;
  expect(data).toHaveLength(1);
});

it("Author can view their quiz report", async () => {
  const response = await request(app)
    .get("/api/quiz/my-quiz-solutions")
    .set("Authorization", `Bearer ${token1}`)
    .expect(200);
  const { data } = response.body;
  expect(data).toHaveLength(1);
  expect(data).toMatchObject([
    {
      quiz: quiz.id,
      percentage: "100%",
    },
  ]);
});

it("Author can delete their quiz", async () => {
  const response = await request(app)
    .delete(`/api/quiz/delete-quiz/${quiz.id}`)
    .set("Authorization", `Bearer ${token1}`)
    .expect(200);
  expect(response.body.message).toBe("Quiz successfully deleted");
});
