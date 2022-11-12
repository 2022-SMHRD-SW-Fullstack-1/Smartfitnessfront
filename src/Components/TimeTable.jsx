import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie } from './auth/cookie'

const TimeTable = (props) => {

  const weekdays =['일','월','화','수','목','금','토']

  console.log(props)

  const navigate =useNavigate()

  const movePage =()=>{

    

  }

  
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
            navigate("/gx-prog/book?name"+props.name+
            "&time="+props.start+
            "&date="+props.weekday)
          }
        }

    }}>
      <h1>{props.name}</h1>
      <p className='eBoxInfo'>{props.start}</p>
      <span>{weekdays[props.weekday]}요일</span>
      <p>Now : {props.curr}/Max : {props.max}</p>
    </div>
  )
}

export default TimeTable