import express from "express";
import LikesController from '../controllers/likes.controller.js';

export const router = express.Router();

router.get("/matches/:id", LikesController.getMatches);
router.get("/my_likes/:id", LikesController.getMyLikes);
router.get("/liked_partners/:id", LikesController.getLikedPartners);
