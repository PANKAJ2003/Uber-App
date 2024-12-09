import React, { useState } from "react";
import { Link } from "react-router-dom";
import Safar from "../assets/Safar.png";
const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen sm:w-1/2 sm:mx-auto md:w-1/2 md:mx-auto lg:w-1/3">
      <div>
        <div className="flex justify-center items-center">
          <img className="w-40 md:w-80" src={Safar} alt="Safar" />
        </div>
        <form action="" onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] py-3 px-4 rounded-md mb-7 border w-full text-lg placeholder:text-gray-400 placeholder:text-base focus:ring-blue-400"
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
          <button className="bg-[#111111] font-semibold text-white py-3 px-4 rounded-md mb-2 w-full text-lg">
            Login
          </button>
        </form>
        <p>
          To join our fleet{" "}
          <Link to="/captain-signup" className="text-blue-600 md-7">
            Create a captain account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="flex justify-center bg-green-700 font-semibold text-white py-3 px-4 rounded-md mb-2 w-full text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
