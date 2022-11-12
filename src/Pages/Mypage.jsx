import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../Components/auth/cookie'
import Star from './Star'
import Rating from './Rating'

const Mypage = () => {

  const [userId,setUserId]=useState();
  const [userInfo,setUserInfo]=useState();
  const nowDate = new Date();

  const url ="http://localhost:8889/smart/members/membership/"+userId
  
  useEffect(()=>{
    setUserId(getCookie("x_auth").mem_data.mem_id)
    },[])

    
    useEffect(() => {
      console.log(userId)
      console.log(url)
      axios.get(url,{
        mem_id:userId})
          .then((res,err) => {
            console.log("마이 페이지 axios then-->",res.data);
            console.log("마이 페이지 axios period Date-->",res.data.mbs_period);
            console.log("마이 페이지 axios now-->",nowDate);
            setUserInfo(res.data.mbs_period)
          }).catch(err=>{
            console.log("에러-->",err)
          });
  }, [url]);


  return (
    <div className='pagesDiv'>
        <h1>{userId}'s div area</h1>


        <div className='mypageDiv'>

            <button>Update profile</button>
            <div>

            <h3>Membership</h3>
            <p>{userInfo}</p>
            
            <Link to='/membership'>
            <button>이용권 연장</button>
            </Link>
            </div>
            <div>
            <h4>예약현황</h4>
            <h3></h3>
            <Rating starts={0} />
            </div>

            
        </div>

        
    </div>
  )
}

export default Mypage