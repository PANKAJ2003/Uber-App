import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Safar from "../assets/Safar.png";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const captain = { email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captain
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setCaptain(data.captain);
        navigate("/captainHome");
      }
    } catch (err) {
      // Handle server or network errors
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen sm:w-1/2 sm:mx-auto md:w-1/2 md:mx-auto lg:w-1/3">
      <div>
        <div className="flex justify-center items-center">
          <img className="w-40 md:w-80" src={Safar} alt="Safar" />
        </div>
        <form onSubmit={submitHandler}>
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
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className={`bg-[#111111] font-semibold text-white py-3 px-4 rounded-md mb-2 w-full text-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
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
