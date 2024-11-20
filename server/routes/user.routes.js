import express from "express";
import UserController from "../controllers/user.controller.js";

export const router = express.Router();
router.get("/user/:id", UserController.getUser);
router.delete("/user/:id", UserController.deleteUser);
router.put("/user", UserController.updateUser);
router.patch("/user", UserController.patchUser);
