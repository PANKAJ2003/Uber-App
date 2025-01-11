import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmAcceptedRide = ({
  setRidePopUpPanel,
  setAcceptdRidePopUp,
  newRide,
}) => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: newRide._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setRidePopUpPanel(false);
        setAcceptdRidePopUp(false);
        navigate("/captain-riding", { state: { ride: newRide } });
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCancleRide = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/cancle-ride`,
        {
          rideId: newRide._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setRidePopUpPanel(false);
        setAcceptdRidePopUp(false);
        navigate("/captainHome");
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div>
      {/* <h5
        className="absolute top-1 w-[93%] text-center text-2xl p-1 hover:bg-slate-200 rounded-md "
        onClick={() => {
          setAcceptdRidePopUp(false);
          setRidePopUpPanel(false);
        }}
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5> */}
      <h3 className="text-2xl font-semibold my-4">Confirm Ride</h3>
      <div className="flex items-center justify-between p-3 mt-4 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">{`${newRide?.user?.fullname.firstname} ${newRide?.user?.fullname.lastname}`}</h2>
        </div>
        <h5 className="text-lg font-semibold">
          {Math.round(newRide?.distance / 100) / 10} Km
        </h5>
      </div>

      <div className="flex  mt-5 flex-col justify-between items-center">
        <div className="w-full">
          <div className=" flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              {/* <h3 className="text-lg font-medium ">523/11-A</h3> */}
              <p className="text-sm -mt-1 text-gray-600 capitalize">
                {newRide?.pickup}
              </p>
            </div>
          </div>
          <div className=" flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-line"></i>
            <div>
              {/* <h3 className="text-lg font-medium ">523/11-A</h3> */}
              <p className="text-sm -mt-1 text-gray-600 capitalize">
                {newRide?.destination}
              </p>
            </div>
          </div>
          <div className=" flex items-center gap-5 p-3">
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">₹{newRide?.fare}</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full mt-6">
          <form onSubmit={submitHandler}>
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
            {error && <p className="text-red-600">{error}</p>}

            <button
              className="w-full mt-2 text-lg bg-red-500 p-3 rounded-md text-gray-600 font-semibold"
              onClick={handleCancleRide}
            >
              Cancle
            </button>
            <button className="w-full mt-3 text-lg bg-green-600 p-3 rounded-md text-white font-semibold flex justify-center">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAcceptedRide;
