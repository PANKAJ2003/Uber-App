import userModel from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklistToken.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = blacklistTokenModel.findOne({ token: token })
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }


        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);

        return res.status(401).json({ message: "Unauthorized" });
    }
}