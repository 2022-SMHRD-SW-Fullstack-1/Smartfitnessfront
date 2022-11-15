import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie } from '../Components/auth/cookie'
import Rating from '../Components/Rating'


const PtInfo = () => {
  const params = new URLSearchParams(window.location.search)
  const name =params.get("name")
  const seq = params.get("seq")
  const img = params.get("img")

  console.log(name)
  console.log(seq)

  const navigate = useNavigate()



  const bookBtn =()=>{
    if(getCookie('x_auth')===undefined){
      alert('로그인이 필요한 기능입니다!')
      navigate('/login')
    }else{
      navigate('/book')
    }
  }


  

  return (
    <div className='pagesDiv'>
      <h1> Hi! I'm {name}</h1>
      <div className='ptInfoPage'>
      <img src={img} alt="트레이너 사진"/>
      <div className='starZone'>
      <h3>Rating Your Trainer!</h3>
      <Rating id='starSpan'/>
      </div>
      <button className='ptBookBtn' onClick={bookBtn}>Make a reservation</button>
      </div>
    </div>
  )
}

export default PtInfo