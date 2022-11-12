import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from '../Components/Calendar/Calender'

const Booking = (props) => {

  const navigate = useNavigate()

  useEffect(()=>{
    if(props.type==="0"){
      navigate("/login")
    }else{

    }
  },[])
  
  return (
    <div className='bookingDiv'>
        <h1>Booking</h1>
        <Calendar/>
        {/* <div>Personal Traning</div>
        <div>Gx programs</div>
        <div>Equipments</div> */}
      </div>
  )
}

export default Booking