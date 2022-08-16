import app from "./app";
import { connectDB } from "./db/connectDB";

const PORT = process.env.NODE_DOCKER_PORT;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
};

//Start server
startServer().catch(console.log);
