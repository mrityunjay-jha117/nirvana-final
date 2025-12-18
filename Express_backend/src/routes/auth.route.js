import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  tomodachi,
  removeTomodachi,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/tomodachi", protectRoute, tomodachi);
router.put("/remove-tomodachi", protectRoute, removeTomodachi);
router.get("/check", protectRoute, checkAuth);

export default router;
