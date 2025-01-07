import rideModel from "../models/ride.model.js";
import { getDistanceTime } from "./maps.service.js";
import crypto from 'crypto';


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and Destination are required");
    }

    const distanceTime = await getDistanceTime(pickup, destination);
    const baseFare = {
        auto: 20,
        car: 40,
        moto: 10
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 1,
        car: 2,
        moto: 0.5
    };

    const fare = {
        auto: baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto),
        car: baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car),
        moto: baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto)
    };

    return fare;
}

function generateOtp(num) { // You can change the size as needed
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
}

export const createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("User, Pickup, Destination and Vehicle Type are required");
    }

    const fare = await getFare(pickup, destination);
    const otp = generateOtp(4);
    const ride = new rideModel({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp
    })

    return ride;
}