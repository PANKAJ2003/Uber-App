import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import blacklistTokenModel from "../models/blacklistToken.models.js";
export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;

    const isUserAlreadyPresent = await userModel.findOne({ email: email });
    if (isUserAlreadyPresent) {
        return res.status(401).json({ message: "User already exist" })
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })

    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
}

export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({ token, user });
}

export const getUserProfile = (req, res, next) => {
    return res.status(200).json(req.user);
}

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("token");

        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }

        // Check if the token is already blacklisted
        const isTokenBlacklisted = await blacklistTokenModel.findOne({ token });
        if (!isTokenBlacklisted) {
            await blacklistTokenModel.create({ token });
        }

        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};
