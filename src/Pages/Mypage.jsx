import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../Components/auth/cookie'
import MyBooks from '../Components/MyBooks'

const Mypage = () => {

  const [userId,setUserId]=useState();
  const [userInfo,setUserInfo]=useState();
  const nowDate = new Date();

  const url ="http://localhost:8889/smart/members/membership/"+userId
  
  useEffect(()=>{
    setUserId(getCookie("x_auth").mem_data.mem_id)

    },[])

    
    useEffect(() => {

      //console.log(userId)
      //console.log(url)
      
      //잔여기간 가져오는 axios
      axios.get(url,{
        mem_id:userId,
      }
        
        )
          .then((res,err) => {
            //console.log("마이 페이지 axios period Date-->",res.data.mbs_period);
            //console.log("마이 페이지 axios now-->",nowDate);

            console.log('axios then-->',res.data.period)
            // console.log('axios then-->',res)



            //잔여일만 받음
            setUserInfo(res.data.period)


          }).catch(err=>{
            setUserInfo(0)
            console.log("에러-->",err)
          });
  }, [url]);



  return (
    <div className='pagesDiv'>
        <h1>Hi! {userId} </h1>


        <div className='mypageDiv'>

            <button>Update {userId}'s' profile</button>
            
            <div className='mgMembership'>

            <h3>Membership <span>Expiration Date</span> </h3>
            
            <h1>D-{userInfo}</h1>
            
            <Link to='/membership'>
            <button>Extension</button>
            </Link>
            </div>

            <div>
            <h4>예약현황</h4>
            <MyBooks/>
            </div>

            
            
        </div>

        
    </div>
  )
}

export default Mypage