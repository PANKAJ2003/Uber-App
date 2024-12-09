import React, { useState } from "react";
import { Link } from "react-router-dom";
import Safar from "../assets/Safar.png";
const UserSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    });
    console.log(userData);

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between sm:w-1/2 sm:mx-auto h-screen md:w-1/2 md:mx-auto lg:w-1/3">
      <div>
        <div className="flex justify-center items-center">
          <img className="w-40 md:w-80" src={Safar} alt="Safar" />
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
          <button className="bg-[#111111] font-semibold text-white py-3 px-4 rounded-md mb-2 w-full text-lg">
            Register
          </button>
        </form>
        <p className="text-center">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600 md-7">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
