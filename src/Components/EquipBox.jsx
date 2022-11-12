import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EquipBox = (props) => {

  const navigate =useNavigate()

  const [image,setImage]=useState(props.img1);

  const imgChange =()=>{
    if(props.img2!==undefined){
      setImage(props.img2)
    }
  }

  const imgBack =()=>{
    setImage(props.img1)
  }




  const movePage =()=>{
    if(props.type==='1'){
      navigate("/pt-info?name="+props.name)
    }else if(props.type==='0'){
      navigate("/book-eq?name="+props.name)
    }else{
      
    }
  }

  return (
    <div className='itemBox' onClick={movePage}>
      <img onMouseEnter={imgChange} onMouseLeave={imgBack} src={image} alt={props.name}/>
      <h1>{props.name}</h1>
      <p className='eBoxInfo'>{props.info}</p>
      <p>{props.desc}</p>
      <h2>{props.price}</h2>
    </div>
  )
}

export default EquipBox