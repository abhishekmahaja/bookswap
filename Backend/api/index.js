import { createServer } from "http";
import { app, connectDB } from "..";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(" Server is running on http://localhost:" + PORT);
  });
};

startServer();
