import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import Safar from "../assets/Safar.png";
import { Link } from "react-router-dom";
import Map from "../assets/DummyMap.png";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmAcceptedRide from "../components/ConfirmAcceptedRide";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTraking";
const CaptainHome = (props) => {
  const { socket } = useContext(SocketContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);

  const [acceptedRidePopUp, setAcceptdRidePopUp] = useState(false);
  const acceptedRideRef = useRef(null);

  const [newRide, setNewRide] = useState(null);

  useEffect(() => {
    socket.emit("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            };

            socket.emit("update-location-captain", {
              userId: captain._id,
              location,
            });
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    updateLocation();
    const locationUpdateInterval = setInterval(updateLocation, 10000);
    return () => {
      clearInterval(locationUpdateInterval);
    };
  }, [captain]);

  //new ride notification
  socket.on("new-ride", (ride) => {
    setNewRide(ride);
    setRidePopUpPanel(true);
  });

  const acceptRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: newRide._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
    } catch (error) {
      throw error;
    }
  };

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0)",
        display: "block",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)",
        display: "hidden",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (acceptedRidePopUp) {
      gsap.to(acceptedRideRef.current, {
        transform: "translateY(0)",
        display: "block",
      });
    } else {
      gsap.to(acceptedRideRef.current, {
        transform: "translateY(100%)",
        display: "hidden",
      });
    }
  }, [acceptedRidePopUp]);

  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex items-center justify-between w-full ">
        <img src={Safar} alt="Safar" className="w-20" />
        <Link
          to="/captain-logout"
          className="h-10 w-10 flex justify-center items-center rounded-full bg-white"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <LiveTracking />
      </div>
      <div className="h-2/5 p-4">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopUpPanelRef}
        className="hidden fixed w-full z-10 bottom-0 translate-y-0 bg-white px-3 py-6 pt-10"
      >
        <RidePopUp
          newRide={newRide}
          setRidePopUpPanel={setRidePopUpPanel}
          setAcceptdRidePopUp={setAcceptdRidePopUp}
          acceptRide={acceptRide}
        />
      </div>

      <div
        ref={acceptedRideRef}
        className="hidden fixed w-full h-screen z-10 bottom-0 translate-y-0 bg-white px-3 py-6 pt-4 overflow-y-auto"
      >
        <ConfirmAcceptedRide
          newRide={newRide}
          setRidePopUpPanel={setRidePopUpPanel}
          setAcceptdRidePopUp={setAcceptdRidePopUp}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
