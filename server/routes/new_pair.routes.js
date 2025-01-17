import express from "express";
import NewPairController from '../controllers/new_pair.controller.js';

export const router = express.Router();

router.get("/new_pairs/:id", NewPairController.getNewPairsByUser); 