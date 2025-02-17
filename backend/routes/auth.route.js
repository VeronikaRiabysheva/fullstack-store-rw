import express from "express";
import {
  login,
  logout,
  signup,
  refreshToken,
  getProfile,
} from "../controllers/auth.constroller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

router.get("/profile", protectRoute, getProfile);

export default router;

//ER2IAd8UFZCeRY0t
//Your current IP address (144.202.13.106)

//144.202.13.106/32
