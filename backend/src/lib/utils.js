export const generateToken = (userId, res) => {
  const { JWT_SECRET, NODE_ENV } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: NODE_ENV === "development" ? "lax" : "none", // 🔥 production must be 'none'
    secure: NODE_ENV === "development" ? false : true,     // 🔥 production must be true (HTTPS)
  });

  return token;
};
