import captainModel from "../models/captain.model.js";

export const createCaptain = async ({ firstname, lastname, email, password, color, plate, type, capacity }) => {
    if (!firstname || !email || !password || !color || !plate || !type || !capacity) {
        throw new Error("All fields are required");
    }
    const captain = captainModel.create({
        fullname: {
            firstname: firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            type,
            capacity
        }
    })
    return captain;
}