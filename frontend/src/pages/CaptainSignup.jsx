import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Safar from "../assets/Safar.png";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        type: vehicleType.toLowerCase(),
        capacity: vehicleCapacity,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      newCaptain
    );

    if (response.status === 200) {
      setCaptain(newCaptain);
      localStorage.setItem("token", response.data.token);
      navigate("captainHome");
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleType("");
    setVehicleCapacity("");
  };

  return (
    <div className="p-7 flex flex-col justify-between sm:w-1/2 sm:mx-auto h-screen md:w-1/2 md:mx-auto lg:w-1/3">
      <div>
        <div className="flex justify-center items-center">
          <img className="w-16  md:w-48" src={Safar} alt="Safar" />
        </div>
        <form action="" onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg mb-2">What's your Name</h3>
          <div className="flex gap-4">
            <input
              className="bg-[#eeeeee] w-1/2 py-2 px-4 rounded-md mb-5 border text-lg placeholder:text-gray-400 placeholder:text-base focus:ring-blue-400"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              type="text"
              placeholder="Firstname"
            />
            <input
              className="bg-[#eeeeee] w-1/2 py-2 px-4 rounded-md mb-5 border text-lg placeholder:text-gray-400 placeholder:text-base focus:ring-blue-400"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              placeholder="Lastname"
            />
          </div>
          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] py-3 px-4 rounded-md mb-5 border w-full text-lg placeholder:text-gray-400 placeholder:text-base focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="example@email.com"
          />

          <h3 className="text-lg mb-2">Enter password</h3>

          <input
            className="bg-[#eeeeee] py-3 px-4 rounded-md mb-7 border w-full text-lg placeholder:text-gray-400 placeholder:text-base focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Password"
          />
          <h3 className="text-lg mb-2">Vehicle Details</h3>
          <div className="flex gap-4">
            <input
              className="bg-[#eeeeee] w-1/2 py-2 px-4 rounded-md mb-5 border text-lg placeholder:text-gray-400 placeholder:text-base focus:ring-blue-400"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              type="text"
              placeholder="Vehicle Color"
            />
            <input
              className="bg-[#eeeeee] w-1/2 py-2 px-4 rounded-md mb-5 border text-lg placeholder:text-gray-400 placeholder:text-base focus:ring-blue-400"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              type="text"
              placeholder="Vehicle Plate Number"
            />
          </div>
          <div className="flex gap-4">
            <select
              className="bg-[#eeeeee] w-1/2 py-2 px-4 rounded-md mb-5 border text-lg placeholder:text-gray-400 placeholder:text-base focus:ring-blue-400"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value="">Select Vehicle Type</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Auto">Auto</option>
              <option value="Car">Car</option>
              <option value="Bus">Bus</option>
            </select>

            <input
              className="bg-[#eeeeee] w-1/2 py-2 px-4 rounded-md mb-5 border text-lg placeholder:text-gray-400 placeholder:text-base focus:ring-blue-400"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              type="number"
              placeholder="Vehicle Capacity"
              min={1}
              max={200}
            />
          </div>

          <button className="bg-[#111111] font-semibold text-white py-3 px-4 rounded-md mb-2 w-full text-lg">
            Register
          </button>
        </form>
        <p className="text-center">
          Already have account?{" "}
          <Link to="/captain-login" className="text-blue-600 md-7">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
