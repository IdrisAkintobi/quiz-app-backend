import mongoose from "mongoose";

const {
  MONGO_HOST: host,
  MONGODB_DOCKER_PORT: port,
  MONGODB_NAME: name,
  MONGODB_USER: user,
  MONGODB_PASSWORD: password,
} = process.env;

const connectDB = async () => {
  try {
    const uri = `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=admin`;
    await mongoose.connect(uri);
    console.log(`🔌 Database connected to ${host}`);
  } catch (err) {
    console.log(`could not connect to mongodb ---- ${err}`);
    process.exit(1);
  }
};

export default connectDB;
