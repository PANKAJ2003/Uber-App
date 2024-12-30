import React from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = ({
  vehiclePanel,
  setVehiclePanel,
  setLocationPanel,
}) => {
  //sample loacation data
  const locations = [
    "Graphic Era Hill University, Dehradun",
    "Graphic Era Hill University, Dehradun",
    "Graphic Era Hill University, Dehradun",
  ];

  return (
    <div className="p-5">
      {/* this is sample data */}

      {locations.map((location,key) => {
        return (
          <div key={key}
            className="flex items-center justify-start gap-3 my-1 border-2 border-white active:border-black rounded-xl p-3"
            onClick={() => {
              setVehiclePanel(true);
              setLocationPanel(false);
            }}
          >
            <h5 className="text-xl rounded-full bg-[#eeeeee] w-10 h-10 flex items-center justify-center">
              <i className="ri-map-pin-fill"></i>
            </h5>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
