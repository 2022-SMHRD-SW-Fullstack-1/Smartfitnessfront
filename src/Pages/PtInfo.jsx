import { Rating } from '@mui/material'
import React from 'react'

const PtInfo = () => {
  const params = new URLSearchParams(window.location.search)
  const name =params.get("name")

  return (
    <div className='pagesDiv'>
      <h1> Hi! I'm {name}</h1>
      <div className='ptInfoPage'>
      <img src="" alt="트레이너 사진"/>
      <p>트레이너 멘트</p>
      <h3>Rating Your Trainer!</h3>
      <Rating stars={0} id='starSpan'/>
      <button>Make a reservation</button>
      </div>
    </div>
  )
}

export default PtInfo