import request from "supertest";
import app from "../app";
import { User } from "../model/user";
import { connection } from "mongoose";
import data from "./mock.data";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let token1: string;
let token2: string;

const testMongo = MongoMemoryServer.create();
beforeAll(async () => {
  mongoose.connect((await testMongo).getUri());
});

afterAll(async () => {
  await Promise.all([connection.close(), (await testMongo).stop()]);
});

describe("Testing if Schemas exist", () => {
  it("Check user schema", () => {
    expect(User).toBeDefined();
  });
});

describe("Test user account creation", () => {
  it("User is created", async () => {
    const responseOne = await request(app)
      .post("/api/user/signup")
      .send(data.user1)
      .expect(201);

    const responseTwo = await request(app)
      .post("/api/user/signup")
      .send(data.user2)
      .expect(201);

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
});
