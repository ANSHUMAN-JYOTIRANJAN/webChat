import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

const parseCookies = (cookieHeader = "") =>
  Object.fromEntries(
    cookieHeader.split("; ").map(c => c.split("="))
  );

export const socketAuthMiddleware = async (socket, next) => {
  try {
     const cookies = parseCookies(socket.handshake.headers.cookie);
    const token = cookies.jwt;

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }
    socket.user = user;
    socket.userId = user._id.toString();
    console.log(
      `Socket authenticated for user: ${user.fullName} (${user._id})`
    );
    next();
  } catch (error) {
     if (error.name === "TokenExpiredError") {
       console.log("Socket auth failed: Token expired");
      return next(new Error("Token expired"));
    }

    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
