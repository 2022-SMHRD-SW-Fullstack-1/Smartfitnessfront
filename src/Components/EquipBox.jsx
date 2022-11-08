import React from 'react'

const EquipBox = (props) => {

  return (
    <div className='itemBox'>
      <img src={props.img} alt={props.name}/>
      <h2>{props.name}</h2>
      <p>{props.desc}</p>
    </div>
  )
}

export default EquipBox