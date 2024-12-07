import mongoose from "mongoose";


export async function connnetToDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("Connected to DB")
    }
    catch (error) {
        console.log(error);
    }
}