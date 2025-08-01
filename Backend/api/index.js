// import { createServer } from "http";
// import { app, connectDB } from "..";

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await connectDB();

//   const server = createServer(app);

//   server.listen(PORT, () => {
//     console.log(" Server is running on http://localhost:" + PORT);
//   });
// };

// startServer();


// api/index.js
import { createServer } from "http";
import { app, connectDB } from "..";

// Vercel serverless handler
export default async function handler(req, res) {
  await connectDB(); // connect DB first
  const server = createServer(app);
  server.emit("request", req, res);
}
