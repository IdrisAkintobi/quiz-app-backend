import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";

let testMongo: MongoMemoryReplSet;
beforeAll(async () => {
  testMongo = await MongoMemoryReplSet.create();
  const mongoUri = testMongo.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await Promise.all([mongoose.connection.close(), testMongo.stop()]);
});
