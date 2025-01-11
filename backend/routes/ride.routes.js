import express from "express";
import { body, query } from "express-validator";
import { createRide, getFares, confirmRide, startRide, endRide, cancleRide } from "../controllers/ride.controller.js";
import { authCaptainMiddleware, authUserMiddleware } from "../middlewares/auth.middleware.js";

export const router = express.Router();

router.post("/create-ride",
    authUserMiddleware,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup location"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination location"),
    body("vehicleType").isString().isIn(["auto", "car", "moto"]).withMessage("Invalid vehicle type")
    , createRide);

router.get("/get-fares",
    authUserMiddleware,
    query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup location"),
    query("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination location"),
    getFares
);

router.post("/confirm",
    authCaptainMiddleware,
    body("rideId").isMongoId().withMessage("Invalid ride ID"),
    body("captainId").isMongoId().withMessage("Invalid captain ID"),
    confirmRide
)

router.get("/start-ride",
    authCaptainMiddleware,
    query("rideId").isMongoId().withMessage("Invalid ride ID"),
    query("otp").isLength({ min: 4, max: 4 }).withMessage("Invalid OTP"),
    startRide
)

router.post("/end-ride",
    authCaptainMiddleware,
    body("rideId").isMongoId().withMessage("Invalid ride ID"),
    endRide
)

router.post("/cancle-ride",
    authCaptainMiddleware,
    body("rideId").isMongoId().withMessage("Invalid ride ID"),
    cancleRide
)