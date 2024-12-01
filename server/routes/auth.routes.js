import express from "express";
import AuthController from "../controllers/auth.controller.js";

export const router = express.Router();

router.post("/sign_in", AuthController.signIn);
router.post("/sign_up", AuthController.signUp);
router.post("/verify", AuthController.verifyCode);