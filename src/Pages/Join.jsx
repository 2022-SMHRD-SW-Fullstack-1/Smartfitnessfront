import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import "../Css/login.css";

import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../Components/auth/cookie";


const Join = (props) => {



  const [joinData, setJoinData] = useState({})
    
  const idRef = useRef()
  const pwRef = useRef()
  const nameRef = useRef()
  const addrRef = useRef()
  const bdayRef = useRef()
  const phoneRef = useRef()
  const emailRef = useRef()
  const pwCkRef = useRef()

    const navigate = useNavigate();

    const joinBtn =(e)=>{
      e.preventDefault();

      setJoinData({
          'mem_id' : idRef.current.value,
          'mem_pw' : pwRef.current.value,
          'mem_name' : nameRef.current.value,
          'mem_addr' : addrRef.current.value,
          'mem_birthdate' : bdayRef.current.value,
          'mem_phone' : phoneRef.current.value,
          'mem_email' : emailRef.current.value,
      })

      if(pwRef!==pwCkRef){
          alert('비밀번호를 확인해주세요')
      }else{
          
      }

  }




    const joinFunc = () =>{
        const url = "http://localhost:8889/smart/members/join";
        axios
        .post(url, JSON.stringify(joinData), {
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then((res, err) => {
            setCookie("x_auth", {
                user_id: res.data.user_id
            });
            console.log("x_auth" , getCookie("x_auth"));
            alert('회원가입 성공!')
        })
        .catch((err) => {
            alert('회원가입 실패...')
        });


    }

       useEffect(()=>{

        if(Object.keys(joinData).length !== 0 &&
          joinData.name !== '' && joinData.pw !== '' ){
            joinFunc();
            
            setJoinData({})
        }
        
    },[joinData])


  
    return (
      <div className="pagesDiv">
  
          {/* 회원가입 폼 구간 */}

          <form className="joinform">
            
            <h2>Become a <span>MEMBER!</span></h2>
            <input
              type="text"
              placeholder="User Id"
              required
              ref={idRef}
            />

            <input
              type="password"
              placeholder="Password"
              maxLength={20}
              required
              ref={pwRef}
            />

            <input
              type="password"
              placeholder="Check Password"
              maxLength={20}
              required
              ref={pwCkRef}
            />

            <input
              type="name"
              placeholder="name"
              required
              ref={nameRef}
            />

            <input
              type="PhoneNumber"
              placeholder="PhoneNumber"
              required
              ref={phoneRef}
            />

            <input
              type="address"
              placeholder="address"
              required
              ref={addrRef}
            />

            <input
              type="date"
              required
              ref={bdayRef}
            />

            <input
              type="email"
              placeholder="email"
              required
              ref={emailRef}
            />


            
            
          <input onClick={joinBtn} type='submit' value='JOIN US' />
            
          </form>

        </div>
    );
  }


export default Join;
