import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      msg: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after 'Bearer'

  if (!token) {
    return res.status(403).json({
      success: false,
      msg: "No token found in Authorization header.",
    });
  }

  try {
    const decoded = jwt.verify(token, "umarkilleadr");
    req.user = decoded; // Store decoded user info in req.user
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({
      success: false,
      msg: "Invalid or expired token.",
    });
  }
};
