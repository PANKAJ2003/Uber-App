import express from "express";
import { body } from "express-validator";
import { createRide } from "../controllers/ride.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

export const router = express.Router();

router.post("/create",
    authUserMiddleware,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup location"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination location"),
    body("vehicleType").isString().isIn(["auto", "car", "moto"]).withMessage("Invalid vehicle type")
    , createRide);