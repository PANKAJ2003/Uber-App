import React, { useRef, useState } from "react";
import Safar from "../assets/Safar.png";
import { Link } from "react-router-dom";
import Map from "../assets/DummyMap.png";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmAcceptedRide from "../components/ConfirmAcceptedRide";
const CaptainHome = (props) => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
  const ridePopUpPanelRef = useRef(null);

  const [acceptedRidePopUp, setAcceptdRidePopUp] = useState(false);
  const acceptedRideRef = useRef(null);
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
        <img className="h-full w-full object-cover" src={Map} alt="" />
      </div>
      <div className="h-2/5 p-4">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopUpPanelRef}
        className="hidden fixed w-full z-10 bottom-0 translate-y-0 bg-white px-3 py-6 pt-10"
      >
        <RidePopUp
          setRidePopUpPanel={setRidePopUpPanel}
          setAcceptdRidePopUp={setAcceptdRidePopUp}
        />
      </div>

      <div
        ref={acceptedRideRef}
        className="hidden fixed w-full h-screen z-10 bottom-0 translate-y-0 bg-white px-3 py-6 pt-10"
      >
        <ConfirmAcceptedRide
          setRidePopUpPanel={setRidePopUpPanel}
          setAcceptdRidePopUp={setAcceptdRidePopUp}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
