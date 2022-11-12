import React from 'react'

const TimeTable = (props) => {

  const weekdays =['일','월','화','수','목','금','토']

  console.log(props)

  
  return (
    <div className='gxBox'>
      <h1>{props.name}</h1>
      <p className='eBoxInfo'>{props.start}</p>
      <span>{weekdays[props.weekday]}요일</span>
      <p>Now : {props.curr}/Max : {props.max}</p>
    </div>
  )
}

export default TimeTable