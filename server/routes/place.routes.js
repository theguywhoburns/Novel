import express from "express";
import PlaceController from "../controllers/place.controller.js";

export const router = express.Router();

router.post("/place", PlaceController.addPlace);