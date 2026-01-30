import express from "express";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./lib/socket.js"

dotenv.config();
const __dirname = path.resolve();


const PORT = ENV.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://chating-36up.onrender.com",
];

app.use(express.json({limit:"15mb"}));
app.use(express.urlencoded({extended: true, limit:"15mb"}))
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
 app.options("*", cors());
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
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDb:", err);
    process.exit(1);
  });
