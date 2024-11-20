import express from "express";
import MessageController from "../controllers/message.controller.js";

export const router = express.Router();

router.get("/message", MessageController.getMessagesByUsers);
router.post("/message", MessageController.sendMessage);
