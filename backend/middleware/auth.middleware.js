import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res) => {
  try {
    const accessToken = req.cookie.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        message: "Вы не авторизованы - токен для авторизации не предоставлен",
      });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userID).select("-password");

      if (!user) {
        return res.status(401).json({ message: "Пользователь не найден." });
      }

      req.user = user;

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Срок действия токена истек." });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error is in the protectedRoute middleware", error.message);
    res.status(401).json({
      message: "Вы не авторизованы - токен для авторизации не предоставлен",
    });
  }
};

export const adminRoute = (req, res, next) => {
  if (!req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Ошибка доступа. Нет прав администратора." });
  }
};
