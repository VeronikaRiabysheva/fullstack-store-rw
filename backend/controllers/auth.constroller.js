import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  // console.log("accessToken", accessToken)

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token: ${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); //7days
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, //XSS
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //CSRF
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, //XSS
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //CSRF
    maxAge: 7 * 24 * 60 * 60,
  });
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" });
    }
    const user = await User.create({ name, email, password });

    console.log("Генерация токенов для пользователя с ID:", user._id);
    // authenticate user
    const { accessToken, refreshToken } = generateTokens(user._id);
    console.log("Сгенерированные токены:", { accessToken, refreshToken });
    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error is in signUp controller", error.message);

    res.status(500).json({ message: error.message + "Ошибка здесь"});
  }
};





///////////////----------------------

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req body:", req.body);    
    const user = await User.findOne({ email });
    console.log("User found:", user);

    // Проверяем, найден ли пользователь
    if (!user) {
      console.log("Пользователь не найден");
      return res.status(401).json({ message: "Неверное имя или пароль" });
    }

    // Проверяем правильность пароля
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log("Неверный пароль");
      return res.status(401).json({ message: "Неверное имя или пароль" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    console.log("Error is in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

////////////-------------------------



export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      
      await redis.del(`refresh_token: ${decoded.userId}`);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Вы успешно вышли из личного кабинета " });
  } catch (error) {
    console.log("Error is in logout controller", error.message);
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

// this will refresh the access token

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh_tokes provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token: ${decoded.userId}`);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Refresh token is invalid" });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true, //XSS
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", //CSRF
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Access token refreshed successfully" });
  } catch (error) {
    console.log("Error is in Refresh controller", error.message);
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
