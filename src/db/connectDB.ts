import mongoose from "mongoose";
import Redis from "ioredis";

const {
  ATLAS_HOST: DB_Host,
  MONGODB_NAME: DB_Name,
  MONGODB_USER: DB_User,
  MONGODB_PASSWORD: DB_Pwd,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${DB_User}:${DB_Pwd}@${DB_Host}/${DB_Name}?retryWrites=true&w=majority`;
    mongoose.connect(uri);
    console.log(`🔌 Database connected to ${DB_Host}`);
  } catch (err) {
    console.log(`could not connect to mongodb ---- ${err}`);
    process.exit(1);
  }
};

export const redisClient = new Redis({
  host: REDIS_HOST,
  port: (REDIS_PORT as any) || 6379,
  password: REDIS_PASSWORD,
});

redisClient.on("connect", () =>
  console.log(`⚡ Redis connected to ${REDIS_HOST}`)
);
redisClient.on("error", (err) => {
  console.log(`🚩 Redis connection error ---- ${err}`);
  //TODO: to be removed in production
  //Disconnect from Redis i.e on OS doesn't support Redis
  redisClient.disconnect();
});

export default connectDB;
