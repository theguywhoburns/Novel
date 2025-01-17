import express from "express";
import ChatController from "../controllers/chat.controller.js";

export const router = express.Router();

router.get("/chats/:id", ChatController.getChatsByUser);
router.get("/chat", ChatController.getChatByUsers);
router.post("/chat", ChatController.createChat);
router.delete("/chat/:id", ChatController.deleteChat);