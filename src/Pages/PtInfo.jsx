import { Rating } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PtInfo = () => {
  const params = new URLSearchParams(window.location.search)
  const name =params.get("name")
  const seq = params.get("seq")
  const img = params.get("img")

  console.log(name)
  console.log(seq)

  const navigate = useNavigate()

  const bookBtn =()=>{
    navigate('/book')
  }

  return (
    <div className='pagesDiv'>
      <h1> Hi! I'm {name}</h1>
      <div className='ptInfoPage'>
      <img src={img} alt="트레이너 사진"/>
      <p>트레이너 멘트</p>
      <h3>Rating Your Trainer!</h3>
      <Rating stars={0} id='starSpan'/>
      <button onClick={bookBtn}>Make a reservation</button>
      </div>
    </div>
  )
}

export default PtInfo