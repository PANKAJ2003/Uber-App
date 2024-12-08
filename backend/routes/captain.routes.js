import express from "express";
import { body } from "express-validator";
import { loginCaptain, registerCaptain, getCaptainProfile, logoutCaptain } from "../controllers/captain.controller.js";
import { authCaptainMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", [
    body("email").isEmail().isLength({ min: 5 }).withMessage("Invalid Email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("Firstname must be at leat 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Vehicle color must be at least 3 characters long"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Vehicle plate must be at least 3 characters long"),
    body("vehicle.type").isLength({ min: 3 }).withMessage("Vehicle type must be at least 3 characters long"),
    body("vehicle.capacity").isLength({ min: 1 }).withMessage("Vehicle capacity must be at least 1")
], registerCaptain);

router.post("/login", [
    body("email").isEmail().isLength({ min: 5 }).withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 character long")
], loginCaptain);

router.get("/profile", authCaptainMiddleware, getCaptainProfile)

router.get("/logout", logoutCaptain)
export { router };