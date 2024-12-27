import express from "express";
import AuthController from "../controllers/auth.controller.js";

export const router = express.Router();

router.post("/send_verification_code", AuthController.sendVerificationCode);
router.post("/check_verification_code", AuthController.checkVerificationCode);
router.post("/sign_in", AuthController.signIn);
router.post("/sign_up", AuthController.signUp);
