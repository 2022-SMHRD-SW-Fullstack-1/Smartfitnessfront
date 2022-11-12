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
    const num =(Number)(params.get("num"))
    const url ="http://localhost:8889/smart/programs/timetable/"+date.substring(2,4)+"/reserv"
  
    const [mem_id,setMem_id] = useState();
    const [curr_pg_seq,setCurr_pg_seq] = useState();


    const bookProgram =  () => {
        console.log(url)
        axios.post(url,{
          mem_id,
          curr_pg_seq
        }).then((res, err)=>{
          alert("예약 성공!")
        }).catch((err)=>{
          alert("실패")
          console.log(mem_id)
          console.log(curr_pg_seq)
        })
      };
  
      useEffect(()=>{
        getCookie('x_auth')!=null&&setMem_id (getCookie('x_auth').mem_data.mem_id,setCurr_pg_seq(num))
      },[])

    return (
    <div className='pagesDiv'>
        <h1>Gx Program Booking</h1>

        <br/>
        예약날짜 : {date.substring(2,4)}월{date.substring(4,6)}일
        <br/>
        예약시간 : {time.substring(0,2)}시{time.substring(2,4)}분
        <br/>
        예약프로그램 : {name}
        <br/>
        <button onClick={bookProgram}>예약하기</button>
        <Link to ='/gx-prog'>
        <button>취소</button>
        </Link>

    </div>
  )
}

export default GxBook