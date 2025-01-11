import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LiveTracking = ({ rideId, setRouteDetails = () => {} }) => {
  const { socket } = useContext(SocketContext);
  const [currentPosition, setCurrentPosition] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  const [vehicleLocation, setVehicleLocation] = useState();
  const [destination, setDestination] = useState();
  const [zoom, setZoom] = useState(15);

  // Update position using Geolocation API

  const updateCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );

      const geoWatcher = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );

      return () => navigator.geolocation.clearWatch(geoWatcher);
    }
  };

  useEffect(() => {
    updateCurrentPosition();
  }, []);

  useEffect(() => {
    if (!rideId) return;
    const updateRideDetails = () => {
      console.log("Updating route details");
      socket.emit("get-route-details", { rideId });
    };
    updateRideDetails();
    const interval = setInterval(updateRideDetails, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [rideId, socket]);

  // Listen to route details updates
  useEffect(() => {
    const handleRouteDetails = ({ rideDetails }) => {
      if (!rideDetails) {
        return;
      }
      setVehicleLocation(rideDetails?.currentPosition);
      setDestination(rideDetails?.destination);
    };

    socket.on("route-details", handleRouteDetails);

    return () => {
      socket.off("route-details", handleRouteDetails); // Cleanup on unmount
    };
  }, [socket]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={containerStyle}
        defaultCenter={currentPosition}
        defaultZoom={zoom}
        onZoomChanged={(zoom) => setZoom(zoom)}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
        fullscreenControl={false}
      >
        <AdvancedMarker position={currentPosition} />
        {destination && vehicleLocation && (
          <Direction
            origin={vehicleLocation}
            destination={destination}
            setRouteDetails={setRouteDetails}
          />
        )}
      </Map>
    </APIProvider>
  );
};

export default LiveTracking;

function Direction({ origin, destination, setRouteDetails }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionRenderer, setDirectionRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionRenderer(
      new routesLibrary.DirectionsRenderer({
        map,
      })
    );
    setDirectionsService(new routesLibrary.DirectionsService());
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionRenderer || !origin || !destination)
      return;

    directionsService
      .route({
        origin,
        destination,
        travelMode: routesLibrary.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch((error) => {
        console.error("Error fetching directions:", error);
      });
  }, [
    directionsService,
    directionRenderer,
    origin,
    destination,
    routesLibrary,
  ]);

  useEffect(() => {
    if (routes.length > 0) {
      setRouteDetails(routes[routeIndex]);
    }
  }, [routes, routeIndex, setRouteDetails]);

  return null;
}
