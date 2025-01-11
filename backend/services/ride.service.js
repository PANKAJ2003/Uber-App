import rideModel from "../models/ride.model.js";
import { getDistanceTime } from "./maps.service.js";
import crypto from 'crypto';


export async function getFare(pickup, destination) {
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
        auto: Math.round(
            (baseFare.auto +
                ((distanceTime.distance.value / 1000) * perKmRate.auto) +
                ((distanceTime.duration.value / 60) * perMinuteRate.auto)) * 100
        ) / 100,
        car: Math.round(
            (baseFare.car +
                ((distanceTime.distance.value / 1000) * perKmRate.car) +
                ((distanceTime.duration.value / 60) * perMinuteRate.car)) * 100
        ) / 100,
        moto: Math.round(
            (baseFare.moto +
                ((distanceTime.distance.value / 1000) * perKmRate.moto) +
                ((distanceTime.duration.value / 60) * perMinuteRate.moto)) * 100
        ) / 100,
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
    const distanceTime = await getDistanceTime(pickup, destination);
    const otp = generateOtp(4);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp,
        distance: distanceTime.distance.value,
        duration: distanceTime.duration.value
    })

    return ride;
}

export const confirmRide = async ({ rideId, captainId }) => {
    if (!rideId || !captainId) {
        throw new Error("Ride ID and Captain ID are required");
    }

    await rideModel.updateOne({ _id: rideId }, { captain: captainId, status: "accepted" });
    const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate("captain").select("+otp");

    if (!ride) {
        throw new Error("Ride not found");
    }

    return ride;
}

export const startRide = async ({ rideId, otp }) => {
    if (!rideId || !otp) {
        throw new Error("Ride ID and OTP are required");
    }

    const ride = await rideModel.findById(rideId)
        .populate("user")
        .populate("captain")
        .select("+otp");

    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.status !== "accepted") {
        throw new Error("Ride is not accepted");
    }
    if (ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    await rideModel.updateOne({ _id: rideId }, { status: "ongoing" });

    return ride;
}

export const endRide = async ({ rideId, captainId }) => {
    if (!rideId || !captainId) {
        throw new Error("Ride ID and Captain ID are required");
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captainId,
    }).populate("user").populate("captain");

    if (!ride) {
        throw new Error("Ride not found");
    }

    await rideModel.updateOne(
        { _id: rideId },
        { status: "completed" }
    );
    ride.status = "completed";
    return ride;
}

export const cancleRide = async ({ rideId, captainId }) => {
    if (!rideId || !captainId) {
        throw new Error("Ride ID and Captain ID are required");
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captainId,
    }).populate("user").populate("captain");

    if (!ride) {
        throw new Error("Ride not found");
    }
    await rideModel.updateOne(
        { _id: rideId },
        { status: "cancelled" }
    );
    ride.status = "cancelled";
    return ride;
}