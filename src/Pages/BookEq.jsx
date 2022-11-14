import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import EqBookTable from '../Components/EqBookTable'
import VideoPlayer from '../Components/VideoPlayer'

const BookEq = () => {

  const params = new URLSearchParams(window.location.search)
  const name =params.get("name")
  const video = params.get("video")
  const seq = params.get("seq")
  const [currData,setCurrData]=useState();


  const url ="http://localhost:8889/smart/equipments/timetable/"+seq

  useEffect(()=>{
    axios.get(url,{em_seq:seq}).then((res,err)=>{
      setCurrData(res.data.current_equipment)
      console.log(res.data.current_equipment)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  return (
    <div className='pagesDiv'>
        <h1>{name}</h1>
        <h1>Available Booking Time</h1>

          <table>
            <tr>

        </tr>
      </table>

        <VideoPlayer url={video}/>
    </div>
  )
}

export default BookEq