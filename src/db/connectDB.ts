import mongoose from "mongoose";
import Redis from "ioredis";

const {
  MONGO_HOST: DB_Host,
  MONGODB_DOCKER_PORT: DB_Port,
  MONGODB_NAME: DB_Name,
  MONGODB_USER: DB_User,
  MONGODB_PASSWORD: DB_Pwd,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

const connectDB = async () => {
  try {
    const atlas_uri = `mongodb+srv://root:${DB_Pwd}@cloud.rcnz6fx.mongodb.net/${DB_Name}?retryWrites=true&w=majority`;
    const uri = `mongodb://${DB_User}:${DB_Pwd}@${DB_Host}:${DB_Port}/${DB_Name}?replicaSet=rs`;
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
redisClient.on("error", (err) => console.log(`🚩 Redis error: ${err}`));

export default connectDB;
