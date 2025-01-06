import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmAcceptedRide = ({ setRidePopUpPanel, setAcceptdRidePopUp }) => {
  const [otp, setOTP] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h5
        className="absolute top-1 w-[93%] text-center text-2xl p-1 hover:bg-slate-200 rounded-md "
        onClick={() => {
          setAcceptdRidePopUp(false);
          setRidePopUpPanel(false);
        }}
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold my-4">Confirm Ride</h3>
      <div className="flex items-center justify-between p-3 mt-4 bg-yellow-400 rounded-lg ">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt=""
          />
          <h2 className="text-lg font-medium">Harsh Patel</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex gap-2 mt-5 flex-col justify-between items-center">
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
        <div className="w-full mt-6">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              type="text"
              placeholder="Enter OTP"
              className="bg-[#eeeeee] px-6 py-3 text-base rounded-lg w-full my-4 font-mono"
              inputMode="numeric"
              maxLength="4"
              pattern="\d{4}"
              value={otp}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
            />

            <button
              className="w-full mt-2 text-lg bg-red-500 p-3 rounded-md text-gray-600 font-semibold"
              onClick={() => {
                setRidePopUpPanel(false);
                setAcceptdRidePopUp(false);
              }}
            >
              Cancle
            </button>
            <Link
              to="/captain-riding"
              className="w-full mt-3 text-lg bg-green-600 p-3 rounded-md text-white font-semibold flex justify-center"
            >
              Confirm
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAcceptedRide;
