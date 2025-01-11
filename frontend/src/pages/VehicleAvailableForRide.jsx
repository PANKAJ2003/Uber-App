import React from "react";
import bikeIcon from "../assets/bikeIcon.png";
import carIcon from "../assets/carIcon.png";

const VehicleAvailableForRide = ({
  setVehiclePanel,
  setConfirmRidePanel,
  fares,
  selectVehicle,
}) => {
  return (
    <div className=" bg-white p-3">
      <h5
        className="absolute text-2xl right-6 top-5 p-1 hover:bg-slate-200 rounded-md"
        onClick={() => {
          setVehiclePanel(false);
        }}
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold my-4">Available vehicle</h3>
      <div
        className="flex gap-4 items-center border-2 active:border-black rounded-xl p-3 mb-2"
        onClick={() => {
          selectVehicle("moto");
          setConfirmRidePanel(true);
        }}
      >
        <img className="h-12 w-12" src={bikeIcon} alt="bike" />
        <div className="w-1/2 flex flex-col justify-center">
          <h4 className="font-semibold text-base">
            Motorcycle Safar{" "}
            <span className="font-medium">
              <i className="ri-user-fill">1</i>
            </span>
          </h4>
          <h5 className="text-sm">5 min away</h5>
          <p className="text-xs font-normal text-gray-600">
            Affordable, Compact Ride
          </p>
        </div>
        <h2 className="font-semibold text-lg">₹{fares.moto}</h2>
      </div>
      <div
        className="flex gap-4 items-center border-2 active:border-black rounded-xl p-3 mb-2"
        onClick={() => {
          setConfirmRidePanel(true);
          selectVehicle("car");
        }}
      >
        <img className="h-12 w-12" src={carIcon} alt="bike" />
        <div className="w-1/2">
          <h4 className="font-semibold text-base">
            Car Safar
            <span className="font-medium">
              <i className="ri-user-fill">4</i>
            </span>
          </h4>
          <h5 className="text-sm">17 min away</h5>
          <p className="text-xs font-normal text-gray-600">
            Affordable, Compact Ride
          </p>
        </div>
        <h2 className="font-semibold text-lg">₹{fares.car}</h2>
      </div>
      <div
        className="flex gap-4 items-center border-2 active:border-black rounded-xl p-3 mb-2"
        onClick={() => {
          setConfirmRidePanel(true);
          selectVehicle("auto");
        }}
      >
        <img className="h-12 w-12" src={bikeIcon} alt="bike" />
        <div className="w-1/2 flex flex-col justify-center">
          <h4 className="font-semibold text-base">
            Auto
            <span className="font-medium">
              <i className="ri-user-fill">1</i>
            </span>
          </h4>
          <h5 className="text-sm">5 min away</h5>
          <p className="text-xs font-normal text-gray-600">
            Affordable, Compact Ride
          </p>
        </div>
        <h2 className="font-semibold text-lg">₹{fares.auto}</h2>
      </div>
    </div>
  );
};

export default VehicleAvailableForRide;
