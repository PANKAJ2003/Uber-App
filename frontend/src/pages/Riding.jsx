import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Map from "../assets/DummyMap.png";
import { SocketContext } from "../context/SocketContext.jsx";
import LiveTracking from "../components/LiveTraking.jsx";

const Riding = (props) => {
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  socket.on("ride-ended", (ride) => {
    navigate("/home");
  });

  const location = useLocation();
  const rideData = location.state.ride;
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed h-10 w-10 flex justify-center items-center rounded-full bg-white right-2 top-2"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {`${rideData?.captain.fullname.firstname} ${rideData?.captain.fullname.lastname}`}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {rideData?.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            <h1 className="text-lg font-semibold">{rideData?.otp} </h1>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                {/* <h3 className="text-lg font-medium">562/11-A</h3> */}
                <p className="text-sm -mt-1 text-gray-600">
                  {rideData?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{rideData?.fare} </h3>
                <p className="text-sm -mt-1 text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-4 bg-green-600 p-3 rounded-md text-white font-semibold">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
