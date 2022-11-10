import React from 'react'

const EquipBox = (props) => {

  return (
    <div className='itemBox'>
      <img src={props.img} alt={props.name}/>
      <h1>{props.name}</h1>
      <p>{props.desc}</p>
      <p>{props.info}</p>
      <h2>{props.price}</h2>
    </div>
  )
}

export default EquipBox