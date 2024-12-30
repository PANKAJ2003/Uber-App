import React from "react";
import carIcon from "../assets/carIcon.png";
import "remixicon/fonts/remixicon.css";

const ConfirmRide = ({ setConfirmRidePanel, setVehicleFound }) => {
  return (
    <div>
      <h5
        className="absolute top-1 w-[93%] text-center text-2xl p-1 hover:bg-slate-200 rounded-md "
        onClick={() => {
          setConfirmRidePanel(false);
        }}
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold my-4">Confirm your ride</h3>

      <div className="flex gap-2 mt-5 flex-col justify-between items-center">
        <img className="h-20 " src={carIcon} alt="car" />
        <div className="w-full">
          <div className=" flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">523/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Clement Towm, Dehradun
              </p>
            </div>
          </div>
          <div className=" flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium ">523/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Clement Towm, Dehradun
              </p>
            </div>
          </div>
          <div className=" flex items-center gap-5 p-3">
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">₹194.38</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button
          className="w-full mt-4 bg-green-600 p-3 rounded-md text-white font-semibold"
          onClick={() => {
            setVehicleFound(true);
            setConfirmRidePanel(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
