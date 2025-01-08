import express from "express";
import SettingsController from "../controllers/settings.controller.js";

export const router = express.Router();

router.get("/settings/:id", SettingsController.getSettingsByUser);
router.patch("/settings/:id", SettingsController.updateSettings);
