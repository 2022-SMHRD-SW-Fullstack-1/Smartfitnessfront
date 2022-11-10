import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../Components/auth/cookie'

const Mypage = () => {

    const [userId,setUserId]=useState();

    useEffect(()=>{
        setUserId(getCookie("x_auth").mem_data.mem_id)
    },[])
  return (
    <div className='pagesDiv'>
        <h1>{userId}'s div area</h1>


        <div className='mypageDiv'>

            <button>Update profile</button>
            <div>

            <h3>Membership</h3>
            <p>남은 기간 출력</p>
            
            <Link to='/membership'>
            <button>이용권 연장</button>
            </Link>
            </div>

            <div>
            <h4>예약현황</h4>
            <h3></h3>
            </div>

            
            
        </div>

        
    </div>
  )
}

export default Mypage