import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
const Home = () => {
  const {captain , setCaptain} = useContext(CaptainDataContext);
  
  return (
    <div>Home
    </div>
  )
}

export default Home