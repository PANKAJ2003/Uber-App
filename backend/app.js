import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connnetToDB } from "./db/db.js";
import { router as userRoutes } from "./routes/user.routes.js";

const app = express();
connnetToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("hello world");
})

app.use("/users", userRoutes);

export default app;