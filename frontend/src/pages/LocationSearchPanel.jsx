import React from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = ({
  suggestions = [],
  setPickUp,
  setDestination,
  activeField,
}) => {
  const handleLocationSelect = (suggestion) => {
    if (activeField === "pickup") {
      setPickUp(suggestion.description);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleLocationSelect(suggestion);
  };

  return (
    <div className="p-5">
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, key) => (
          <div
            key={key}
            className="flex items-center justify-start gap-3 mt-1 border-2 border-white active:border-black rounded-xl p-2 cursor-pointer align-middle"
            onClick={() => handleSuggestionClick(suggestion)}
            tabIndex={0} // Makes it focusable for keyboard navigation
          >
            <h5 className="text-xl w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full flex-shrink-0">
              <i className="ri-map-pin-fill"></i>
            </h5>
            <h4 className="font-medium">{suggestion.description}</h4>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No suggestions available</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
