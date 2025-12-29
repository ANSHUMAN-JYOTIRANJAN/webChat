import express from "express";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";

dotenv.config();
const __dirname = path.resolve();

const app = express();

const PORT = ENV.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../fronted/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../fronted", "dist", "index.html"));
  });
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDb:", err);
    process.exit(1);
  });
