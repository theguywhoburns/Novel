import express from "express";
import PlaceController from "../controllers/place.controller.js";

export const router = express.Router();

router.post("/place", PlaceController.addPlace);
router.get("/places/:cityName", PlaceController.getPlacesByCityName);
router.get("/place/:id", PlaceController.getPlaceById);
// Untested
router.get(
  "/places_by_coords/:geoLat/:geoLon/:searchDistance",
  PlaceController.getPlaceByCoords
);
