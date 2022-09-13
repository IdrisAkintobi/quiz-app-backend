import mongoose from "mongoose";
import Redis from "ioredis";

const {
  MONGODB_HOST,
  MONGODB_URL,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

const connectDB = async () => {
  try {
    const uri = MONGODB_URL as string;
    mongoose.connect(uri);
    console.log(`🔌 Database connected to ${MONGODB_HOST}`);
  } catch (err) {
    console.log(`could not connect to mongodb ---- ${err}`);
    process.exit(1);
  }
};

const redisClient = new Redis({
  host: REDIS_HOST,
  port: (REDIS_PORT as any) || 6379,
  password: REDIS_PASSWORD,
});

redisClient.on("connect", () =>
  console.log(`⚡ Redis connected to ${REDIS_HOST}`)
);
redisClient.on("error", (err) => {
  console.log(`🚩 Redis connection error ---- ${err}`);
  //exit process if redis connection error
  process.exit(1);
});

export { connectDB, redisClient };
