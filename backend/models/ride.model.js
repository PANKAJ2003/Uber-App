import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Captain",
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "ongoing", "completed", "canceled"],
        default: "pending"
    },
    duration: {
        type: Number // in seconds
    },
    distance: {
        type: Number // in meters
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    paymentID: {
        type: String
    },
    orderID: {
        type: String
    },
    signature: {
        type: String
    },
    otp: {
        type: String,
        select: false,
        required: true
    },
});

const rideModel = mongoose.model('Ride', rideSchema);
export default rideModel;