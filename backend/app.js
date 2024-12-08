import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connnetToDB } from "./db/db.js";
import { router as userRoutes } from "./routes/user.routes.js";
import { router as captainRoutes } from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";

const app = express();
connnetToDB();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("hello world");
})

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
export default app;