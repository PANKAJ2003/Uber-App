import express from "express";
import { authUserMiddleware } from "../middlewares/auth.middleware.js"
import { getCoordinates, getDistanceTime, getAutoCompleteSuggestions } from "../controllers/map.controller.js"
import { query } from "express-validator";
const router = express.Router();

router.get('/get-coordinates',
    [query("address").isString().isLength({ min: 3 })],
    authUserMiddleware, getCoordinates);

router.get('/get-distance-time',[
    query("pickup").isString().isLength({min : 3}),
    query("destination").isString().isLength({min:3})
], getDistanceTime);

router.get("/get-suggestions",[
    query("address").isString().isLength({min:3})
],authUserMiddleware, getAutoCompleteSuggestions);

export { router };