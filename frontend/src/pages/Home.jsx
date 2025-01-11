import React, {
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import debounce from "../components/debounce";
import { CaptainDataContext } from "../context/CaptainContext";
import Safar from "../assets/Safar.png";
import Map from "../assets/DummyMap.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "./LocationSearchPanel";
import VehicleAvailableForRide from "./VehicleAvailableForRide";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTraking";

const Home = () => {
  const { socket } = useContext(SocketContext);
  const { user, setUser } = useContext(UserDataContext);

  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [locationPanel, setLocationPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fares, setFares] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [ride, setRide] = useState(null);

  const homeRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  //pickup suggestions
  const debouncedGetPickUpSuggestions = useCallback(
    debounce(async (address) => {
      if (address.length < 3) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { address },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPickupSuggestions(response.data);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    }, 300),
    []
  );

  const handlePickupChange = (e) => {
    const address = e.target.value;
    setPickUp(address);
    debouncedGetPickUpSuggestions(address);
  };

  //destination suggestions
  const debouncedGetDestinationSuggestions = useCallback(
    debounce(async (address) => {
      if (address.length < 3) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { address },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDestinationSuggestions(response.data);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    }, 300),
    []
  );

  const handleDestinationChange = async (e) => {
    const address = e.target.value;
    setDestination(address);
    debouncedGetDestinationSuggestions(address);
  };

  async function findTrip() {
    setVehiclePanel(true);
    setLocationPanel(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fares`,
      {
        params: {
          pickup: pickUp,
          destination: destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      setFares(response.data);
    }
  }

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create-ride`,
        {
          pickup: pickUp,
          destination: destination,
          vehicleType: selectedVehicle,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  socket.on("ride-accepted", (ride) => {
    setRide(ride);
    setVehicleFound(false);
    setWaitingForDriver(true);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  socket.on("ride-cancelled", (ride) => {
    setWaitingForDriver(false);
    setRide(null);
  });

  useGSAP(() => {
    if (locationPanel) {
      gsap.to(panelRef.current, {
        height: "70%",
        transform: "translateY(0)",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
    }
  }, [locationPanel]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(0)",
        display: "block",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(100%)",
        display: "none",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
        display: "block",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
        display: "none",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
        display: "block",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
        display: "none",
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="relative w-screen">
      <div className="w-20 md:w-60 absolute left-5 top-5">
        <img src={Safar} alt="Safar" />
      </div>
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>

      <div
        ref={inputRef}
        className={
          locationPanel
            ? "flex flex-col justify-end w-full h-screen absolute top-0"
            : "flex flex-col justify-end w-full h-0 fixed top-100"
        }
      >
        <div className="h-fit bg-white w-full p-5">
          {locationPanel && (
            <h5
              onClick={() => setLocationPanel(false)}
              className="absolute text-2xl right-6 top-5 p-1 hover:bg-slate-200 rounded-md"
            >
              <i className="ri-arrow-down-s-line"></i>
            </h5>
          )}
          <h4 className="text-3xl font-semibold">Find a ride</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <input
              className="bg-[#eeeeee] px-12 py-3 text-base rounded-lg w-full mt-4"
              type="text"
              onChange={handlePickupChange}
              onClick={() => {
                setLocationPanel(true);
                setActiveField("pickup");
              }}
              value={pickUp}
              placeholder="Add pickup location"
            />
            <input
              className="bg-[#eeeeee] px-12 py-3 text-base rounded-lg w-full my-4"
              type="text"
              onChange={handleDestinationChange}
              onClick={() => {
                setLocationPanel(true);
                setActiveField("destination");
              }}
              value={destination}
              placeholder="Enter your destination"
            />
          </form>
          <button
            className="bg-black w-full text-white text-lg font-base px-4 py-2 rounded-lg mt-2 disabled:text-gray-700 disabled:bg-gray-500"
            onClick={findTrip}
            disabled={!pickUp || !destination}
            style={{ display: locationPanel ? "block" : "none" }}
          >
            Find Ride
          </button>
        </div>
        <div
          ref={panelRef}
          className="h-0 bg-white overflow-y-scroll w-full translate-y-full bottom-0"
        >
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
            setLocationPanel={setLocationPanel}
            activeField={activeField}
            setPickUp={setPickUp}
            setDestination={setDestination}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full"
      >
        <VehicleAvailableForRide
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          fares={fares}
          selectVehicle={setSelectedVehicle}
        />
      </div>

      <div
        ref={confirmRideRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-10 hidden"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          setVehicleFound={setVehicleFound}
          pickUp={pickUp}
          destination={destination}
          fares={fares[selectedVehicle]}
          createRide={createRide}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-ful bg-white px-3 py-6 pt-10 hidden"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          pickUp={pickUp}
          destination={destination}
          fares={fares[selectedVehicle]}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-10 hidden"
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default Home;
