import React, { useRef, useState } from "react";
import Safar from "../assets/Safar.png";
import { Link, useLocation } from "react-router-dom";
import Map from "../assets/DummyMap.png";
import FinishRide from "../components/FinishRide";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LiveTracking from "../components/LiveTraking";
const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  const location = useLocation();
  const ride = location.state.ride;
  const rideId = ride._id;
  const [routeDetails, setRouteDetails] = useState()
  const leg = routeDetails?.legs[0];
  const distance = leg?.distance?.text;
  const duration = leg?.duration?.text;


  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
        display: "block",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
        display: "hidden",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen relative">
      <div className="fixed p-3 top-0 flex items-center justify-between w-full ">
        <img src={Safar} alt="Safar" className="w-20" />
        <Link
          to="/captain-logout"
          className="h-10 w-10 flex justify-center items-center rounded-full bg-white"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <LiveTracking rideId={rideId} setRouteDetails={setRouteDetails} />
      </div>
      <div
        className="h-1/5 p-6 flex items-center justify-between bg-yellow-400 relative"
        onClick={() => setFinishRidePanel(true)}
      >
        <h5 className="absolute top-0 w-[93%] text-center text-2xl p-1 rounded-md text-gray-50">
          <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <div className="flex flex-col">
        <h4 className="text-xl font-semibold">{distance}</h4>
        <h2 className="text-lg text-blue-600 font-semibold">ETA:{duration}</h2>
        </div>
        <button className="bg-green-600 p-4 rounded-md text-white font-semibold flex justify-center">
          Finish Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="hidden fixed w-full h-screen z-10 bottom-0 translate-y-0 bg-white px-3 py-6 pt-10"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} ride={ride} />
      </div>
    </div>
  );
};

export default CaptainRiding;
