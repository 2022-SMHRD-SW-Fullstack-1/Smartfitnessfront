import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { getCookie } from './auth/cookie';

const MyBooksTb = (props) => {


  console.log("MyBooksTb props-->",props)
 
  const mem_id = getCookie('x_auth').mem_data.mem_id

  const [num,setNum]=useState();

  const setNumber =(e)=>{
    setNum(Number(e.target.value))
    removeBook();

    // console.log("취소할때 넘겨주는 seq",num)
    console.log(mem_id,"seq 불러오기->",num)



  }

  const removeBook=()=>{

    const url ="http://localhost:8889/smart/programs/"+mem_id+"/cancel/"+num;

    axios.get(url,{
      num,
      mem_id
    }).then((res,err)=>{
      alert("예약이 취소되었습니다.")
      window.location.reload();
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })

  }



  return (
    <>
    <tr>
        <td>
            {props.start.substring(2,4)}월
            {props.start.substring(4,6)}일
            <br/>
            {props.start.substring(7,9)}시
            {props.start.substring(9,11)}분
        </td>
        <td>
            {props.end.substring(2,4)}월
            {props.end.substring(4,6)}일
            <br/>
            {props.end.substring(7,9)}시
            {props.end.substring(9,11)}분
        </td>
        <td>
            {props.name}
        </td>
        <td>
          <button onClick={setNumber} value={props.seq}>Cancel</button>
        </td>
    </tr>
    </>
  )
}

export default MyBooksTb