import express from "express";
import UserController from "../controllers/user.controller.js";

export const router = express.Router();

// dev util route
router.get("/users", UserController.getUsers);

router.get("/filtered_users", UserController.getFilteredUsers);
router.get("/user/:id", UserController.getUserById);
router.patch("/update_user/:id", UserController.updateUser);
router.post("/like_user", UserController.likeUser);
router.post("/dislike_user", UserController.disLikeUser);
