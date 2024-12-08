import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.models.js";

export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    // check if captain(email) is already exits
    const isCaptainAlreadyPresent = await captainModel.findOne({ email: email });
    if (isCaptainAlreadyPresent) {
        return res.status(401).json({ message: "User already exist" })
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email: email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        type: vehicle.type,
        capacity: vehicle.capacity
    });

    if (!captain) {
        return res.status(401).json({ message: "Failed to register" })
    }
    const token = await captain.generateAuthToken();
    res.status(200).json({ token, captain });
}

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(401).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email: email }).select("+password");

    if (!captain) {
        return res.status(401).json({ message: "Incorrect email or password" });
    }

    const isPasswordMatch = await captain.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = await captain.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, captain });
}


export const getCaptainProfile = async (req, res, next) => {
    return res.status(200).json({ captain: req.captain });
}

export const logoutCaptain = async (req, res, next) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({ token: token });
    res.status(200).json({ message: "Logged out" });
}