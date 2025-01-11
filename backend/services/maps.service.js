import axios from 'axios';
import captainModel from '../models/captain.model.js';

export const getAddressCoordinates = async (address) => {
    try {
        const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};

export const getDistanceTime = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error("Pickup and Destination are required");
    }
    try {
        const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins: pickup,
                destinations: destination,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            return {
                distance: {
                    text: element.distance.text,
                    value: element.distance.value
                },
                duration: {
                    text: element.duration.text,
                    value: element.duration.value
                }
            };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error);
        throw error;
    }
};

export const getSuggestions = async (address) => {
    try {
        const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input: address,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK') {
            return response.data.predictions;
        }
        else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCaptainsInTheRadius = async (ltd, lng, radius) => {
    //radius in km
    if (!ltd || !lng || !radius) {
        throw new Error("Latitude, Longitude and Radius are required");
    }
    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[ltd, lng], radius / 6371]
                }
            }
        })
        return captains;
    }
    catch (error) {
        console.error('Error fetching captains in the radius:', error);
        throw error;
    }
}


export const getRouteEta = async (currentLocationCoordinates, destinationCoordinates) => {
    if (!currentLocationCoordinates || !destinationCoordinates) {
        throw new Error("Current Location and Destination are required");
    }
    try {
        // Constructing coordinates in "latitude,longitude" format
        const currentLocation = `${currentLocationCoordinates.ltd},${currentLocationCoordinates.lng}`;
        const destination = `${destinationCoordinates.ltd},${destinationCoordinates.lng}`;

        const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
        if (!GOOGLE_MAPS_API_KEY) {
            throw new Error("Google Maps API Key is missing");
        }
        const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
            params: {
                origin: currentLocation,
                destination: destination,
                mode: "driving",
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK') {
            const element = response.data.routes[0].legs[0];
            const rideDetails = {
                distance: {
                    text: element.distance.text,
                    value: element.distance.value
                },
                duration: {
                    text: element.duration.text,
                    value: element.duration.value
                }
            };
            return rideDetails;
        } else {
            throw new Error(`Unable to fetch distance and time: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error);
        throw error;
    }
};
