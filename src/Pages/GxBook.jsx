import { accordionSummaryClasses } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../Components/auth/cookie'

const GxBook = () => {

    const params = new URLSearchParams(window.location.search)

    const date =params.get("date")
    const time =params.get("time")
    const name =params.get("name")
    const curr_pg_seq =(Number)(params.get("classnum"))
    const url ="http://localhost:8889/smart/programs/timetable/"+date.substring(2,4)+"/reserv"
    


    const [mem_id,setMem_id] = useState();
    const [token,setToken] = useState();



    const bookProgram =  () => {
        console.log(url)
        axios.post(url,{
          mem_id,
          curr_pg_seq,
          token
        }).then((res, err)=>{
          alert("예약 성공!")
          window.location.replace('/gx-prog')
          
        }).catch((err)=>{
          console.log("catch err-->",err)
          alert("실패") 
          console.log(mem_id)
          console.log(curr_pg_seq)
        })
      };
  
      useEffect(()=>{
        getCookie('x_auth')!=null&&setMem_id (getCookie('x_auth').mem_data.mem_id,
        setToken(getCookie("x_auth").mem_data.accessToken)
)
      },[])

      useEffect(()=>{
        const url ="http://localhost:8889/smart/programs/"+mem_id+"/timetable/my"
        console.log("예약 정보 사용자 url",url)
        axios.get(url,{
          mem_id
        }).then((res,err)=>{
          console.log("이미 예약한 정보 가져오기",res.data)
        }).catch((err)=>{
          console.log(err)
        })
      },[])




    return (
    <div className='pagesDiv'>
        <h1>Gx Program Booking</h1>

        
        <br/>
        <h1>{name}</h1>
        <br/>
        <p>Date : {date.substring(2,4)}월{date.substring(4,6)}일</p> 
      
        <p>Start Time : {time.substring(0,2)}시{time.substring(2,4)}분 </p> 
        <p>End Time : {time.substring(0,2)}시30분 </p> 

        <br/>
        <button onClick={bookProgram}>예약하기</button>

    </div>
  )
}

export default GxBook