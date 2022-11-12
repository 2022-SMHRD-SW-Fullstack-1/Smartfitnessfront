import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from '../Components/Calendar/Calender'

const Booking = (props) => {

  const navigate = useNavigate()

  useEffect(()=>{
    if('mem_data'===null){
      navigate("/login")
    }else{
    }
  },[])
  
  return (
    <div className='bookingDiv'>
        <h1>Booking</h1>
        <Calendar/>
      </div>
  )
}

export default Booking