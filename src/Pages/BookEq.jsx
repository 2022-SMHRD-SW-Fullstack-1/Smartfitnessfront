import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getCookie } from '../Components/auth/cookie'
import VideoPlayer from '../Components/VideoPlayer'

const BookEq = () => {

  const params = new URLSearchParams(window.location.search)
  const name =params.get("name")
  const video = params.get("video")
  const seq = params.get("seq");
  const [currData,setCurrData]=useState([]);


  const url ="http://localhost:8889/smart/equipments/timetable/"+seq

  useEffect(()=>{
    axios.get(url,{
      'em_seq':seq
    }).then((res,err)=>{
      console.log("기구 예약가능 시간 불러오기 ->",res.data)
      console.log("기구 예약가능 시간 불러오기 ->",res.data[0])
      console.log("기구 예약가능 시간 불러오기 ->",res.data[0].ce_09000930)
      setCurrData(res.data[0])
      console.log("currData에 배열넣기 --> ",currData)
    }).catch(err=>{
      console.log(err)
    })
  },[])
  

  const currDataArr =Object.entries(currData).sort((a, b) => {
    if(a[0] > b[0]) return 1
    else if(a[0] === b[0]) return 0
    return -1
  }).slice(0, 18)

  console.log(currDataArr.map(i => i[0]));
  console.log(currDataArr.map(i => i[1]));


  const eqBookBtn =(e)=>{
    console.log("e 값=>",e.target.value)
    const time = Number(e.target.value.substring(3))
    console.log(time);
    console.log("값 보내기 전에 seq찍어보자",seq);
    const url ="http://localhost:8889/smart/equipments/reserv/"+seq+"/"+time
    console.log("url=>",url)
    axios.post(url,{
      mem_id:getCookie("x_auth").mem_data.mem_id,
      token:getCookie("x_auth").mem_data.accessToken
      // em_seq:seq,
      // time:time
      

    }).then((res,err)=>{
      alert('기구 예약 성공!')
      window.location.reload();
    }).catch((err)=>{
      console.log("에러이다이",err)
    })

  }



  return (
    <div className='pagesDiv'>
        <h1>{name}</h1>
        <VideoPlayer url={video}/>
        <h1>Available Booking Time</h1>

        <div className='eqTimeTableDiv'>
          <table className='eqTimeTable'>
            <tbody>
              <tr>
                <th>Time</th>
                <th>Available</th>
                <th>Select</th>
              </tr>
                {currDataArr.map((i => 
                  <tr>
                    <td>{i[0].substring(3,5)}시 {i[0].substring(5,7)}분</td>
                    <td>{i[1]}</td>
                    <td><button onClick={eqBookBtn} value={i[0]}>Booking</button></td>
                  </tr>
                ))}
            </tbody>
            </table>
 
        </div>



    </div>
  )
}

export default BookEq