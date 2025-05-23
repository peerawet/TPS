import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token has invalid format",
    });
  }

  const tokenWithoutBearer = token.split(" ")[1].trim();

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        message: "Token is invalid",
      });
    }

    // Extract user ID from payload
    const userId = payload.sub;

    // Set userId on req object
    req.userId = userId;

    next();
  });
};
