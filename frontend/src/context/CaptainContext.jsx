import React, { createContext, useContext,useState } from "react";

export const CaptainDataContext = createContext();
export const useCaptain =()=>{
    const context = useContext(CaptainContext);
    if(!context){
        throw new Error("useCaptain must be used within a CaptainProvider")
    }
} 
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [error,setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const updateCaptain = (captainData) =>{
    setCaptain(captainData)
  }

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain
  }
  return (
    <CaptainDataContext.Provider value={value}>
      <>{children}</>
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
