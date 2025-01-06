import React, { useContext, useRef, useState } from "react";
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
const Home = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [locationPanel, setLocationPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (locationPanel) {
      gsap.to(panelRef.current, {
        height: "70%",
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
      });
    } else {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="relative w-screen">
      <div className="w-20 md:w-60 absolute left-5 top-5">
        <img src={Safar} alt="Safar" />
      </div>
      <div className="h-screen w-screen">
        <img className="h-full w-full object-cover" src={Map} alt="" />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white top-0 w-full p-5">
          {locationPanel && (
            <h5
              onClick={() => setLocationPanel(false)}
              className="absolute text-2xl right-6 top-5 p-1 hover:bg-slate-200 rounded-md"
            >
              <i className="ri-arrow-down-s-line"></i>
            </h5>
          )}
          <h4 className="text-3xl font-semibold">Find a ride</h4>
          <form action="" onSubmit={(e) => submitHandler(e)}>
            <input
              className="bg-[#eeeeee] px-12 py-3 text-base rounded-lg w-full mt-4"
              type="text"
              onChange={(e) => {
                setPickUp(e.target.value);
              }}
              onClick={() => {
                setLocationPanel(true);
              }}
              value={pickUp}
              placeholder="Add pickup location"
            />
            <input
              className="bg-[#eeeeee] px-12 py-3 text-base rounded-lg w-full my-4"
              type="text"
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              onClick={() => {
                setLocationPanel(true);
              }}
              value={destination}
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white overflow-hidden">
          <LocationSearchPanel
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
            setLocationPanel={setLocationPanel}
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
        />
      </div>

      <div
        ref={confirmRideRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-10"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-10"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-10"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
