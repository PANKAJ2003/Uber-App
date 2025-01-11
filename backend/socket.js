import { Server as socketIO } from 'socket.io';
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";
import rideModel from './models/ride.model.js';
import { getRouteEta, getAddressCoordinates } from './services/maps.service.js';

let io;

export function initializeSocket(server) {
    io = new socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected: ', socket.id);

        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(`User ${userId} joined as ${userType}`);

            if (userType === "user") {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            else if (userType === "captain") {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on("update-location-captain", async (data) => {

            const { userId, location } = data;
            if (!location || !location.ltd || !location.lng) {
                return socket.emit("error", "Location is required");
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        })

        socket.on("get-route-details", async (data) => {
            // console.log("Ride ID", data);

            const { rideId } = data;
            if (!rideId) {
                return socket.emit("error", "Ride ID is required");
            }
            const ride = await rideModel
                .findById(rideId)
                .populate("user")
                .populate("captain");

            if (!ride) {
                return socket.emit("error", "Ride not found");
            }

            const destinationCoordinates = await getAddressCoordinates(ride.destination);
            const rideDetails = {
                currentPosition: {
                    lat: ride.captain.location.ltd,
                    lng: ride.captain.location.lng
                },
                destination: {
                    lat: destinationCoordinates.ltd,
                    lng: destinationCoordinates.lng
                },
            };
            
            sendMessageTOSocketID(ride.user.socketId, "route-details", {rideDetails});
            sendMessageTOSocketID(ride.captain.socketId, "route-details", {rideDetails});
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected: ', socket.id);
        });
    });
}


export function sendMessageTOSocketID(socketId, event, data) {
    if (io) {
        io.to(socketId).emit(event, data);
    }
    else {
        console.log("Socket not initialized");
    }
}
