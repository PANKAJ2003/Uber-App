import { createRide as createRideService, getFare, confirmRide as confirmRideService, startRide as startRideService, endRide as endRideService, cancleRide as cancleRideService } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getAddressCoordinates, getCaptainsInTheRadius } from "../services/maps.service.js";
import { sendMessageTOSocketID } from "../socket.js";
import rideModel from "../models/ride.model.js";


export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    try {
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });

        const pickupCoordinates = await getAddressCoordinates(pickup);
        const captainsInRadius = await getCaptainsInTheRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            3
        )
        ride.otp = "";
        const rideWithUser = await rideModel.findById({ _id: ride._id }).populate("user");
        captainsInRadius.map((captain) => {
            sendMessageTOSocketID(captain.socketId, "new-ride", rideWithUser);
        })
        res.status(201).json(rideWithUser);


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getFares = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;
    try {
        const fares = await getFare(pickup, destination);
        return res.status(200).json(fares);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId, captainId } = req.body;
        const ride = await confirmRideService({ rideId, captainId });

        sendMessageTOSocketID(ride.user.socketId, "ride-accepted", ride);
        return res.status(200).json(ride);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { rideId, otp } = req.query;
        const ride = await startRideService({ rideId, otp });

        sendMessageTOSocketID(ride.user.socketId, "ride-started", ride);
        return res.status(200).json(ride);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { rideId } = req.body;
        const ride = await endRideService({ rideId, captainId: req.captain._id });

        sendMessageTOSocketID(ride.user.socketId, "ride-ended", ride);
        const rideDetails = null;
        sendMessageTOSocketID(ride.captain.socketId, "route-details", { rideDetails });

        return res.status(200).json(ride);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const cancleRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { rideId } = req.body;
        const ride = await cancleRideService({ rideId, captainId: req.captain._id });

        sendMessageTOSocketID(ride.user.socketId, "ride-cancelled", ride);
        return res.status(200).json(ride);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}