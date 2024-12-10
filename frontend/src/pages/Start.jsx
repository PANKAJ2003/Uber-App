import React from "react";
import { Link } from "react-router-dom";
import Safar from "../assets/Safar.png";

const Start = () => {
  return (
    <div className="md:p-7 flex flex-col justify-between sm:w-1/2 sm:mx-auto h-screen md:w-1/2 md:mx-auto lg:w-1/3">
      <div
        className="bg-cover bg-center h-screen w-full flex flex-col justify-between md:h-[80vh] md:my-auto lg:my-auto
      bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]"
      >
        <img className="w-36" src={Safar} alt="Safar" />
        <div className="bg-white py-5 px-4 pb-7 md:px-0">
          <h2 className="text-2xl font-bold">Start Your Safar</h2>
          <Link
            to="/login"
            className="flex justify-center items-center w-full bg-black text-white py-3 rounded-md mt-4"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
