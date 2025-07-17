import express from "express"
import {getUser, login, logout} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/google", login)
router.get("/me",authMiddleware,getUser)
router.post("/logout",authMiddleware, logout)

export default router