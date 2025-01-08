import express from "express";
import UserController from "../controllers/user.controller.js";

export const router = express.Router();

router.get("/users", UserController.getUsers);
router.get("/user/:id", UserController.getUserById);
router.post("/filtered_users/:id", UserController.getFilteredUsers);
router.post("/like_user", UserController.likeUser);
router.post("/dislike_user", UserController.dislikeUser);
router.patch("/update_user/:id", UserController.updateUser);
