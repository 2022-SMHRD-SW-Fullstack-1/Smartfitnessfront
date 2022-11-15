import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie } from './auth/cookie'

const TimeTable = (props) => {

  const weekdays =['일','월','화','수','목','금','토']

  console.log(props)

  const navigate =useNavigate()

  const month = props.date.substring(2,4)
  const day = props.date.substring(4,6)

  const hour = props.time.substring(0,2)
  const mins = props.time.substring(4,6)

  


  
  return (
    <div className='gxBox' onClick={
      movePage=>{
        if(getCookie('x_auth')===undefined){
          alert('로그인이 필요한 기능입니다')
          navigate('/login')
        }else{
          if(props.max-props.curr===0){
            alert('더 이상 예약할 수 없는 클래스입니다.')
  
          }else{
            navigate("/gx-prog/book?name="+props.name+
            "&date="+props.date+"&weekday="+props.weekday+
            "&time="+props.time+"&classnum="+props.classnum)
          }
        }

    }}>
      <p>{month}월 {day}일 <span>{weekdays[props.weekday]}요일</span></p>
      <h1>{props.name} </h1>
      <p>Now : {props.curr}/Max : {props.max}</p>
      <button className='gxBtn'>Make a Book</button>
      <p className='eBoxInfo'>{props.start}</p>
      <p>Start : {hour}시 {mins}분</p>
      <p>End : {hour}시 30분 </p>
      
      
      
    </div>
  )
}

export default TimeTable