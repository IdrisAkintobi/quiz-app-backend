import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";

jest.mock("ioredis", () => jest.requireActual("ioredis-mock"));

let testMongo: MongoMemoryReplSet;
beforeAll(async () => {
  testMongo = await MongoMemoryReplSet.create();
  const mongoUri = testMongo.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await Promise.all([mongoose.connection.close(), testMongo.stop()]);
});
