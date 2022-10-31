import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import "../Css/login.css";

import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../Components/auth/cookie";


const Login = (props) => {

  const login = React.createRef();
  const register = React.createRef();
  const btn = React.createRef();

  
  const registerHandler = () => {
    login.current.style.left = "-400px";
    register.current.style.left = "50px";
    btn.current.style.left = "110px";
  };
  
  const loginHandler = () => {
    login.current.style.left = "50px";
    register.current.style.left = "450px";
    btn.current.style.left = "0px";
  };
  
  const testhandler = () => {
    console.log("clicked!");
    window.open("https://www.google.co.kr/");
  };



  const [userData, setUserData] = useState({})
    
    const idRef = useRef()
    const pwRef = useRef()
    const nameRef = useRef()
    const phoneRef = useRef()
    const addrRef = useRef()
    const emailRef = useRef()

    const navigate = useNavigate();

    const btnCk =(e)=>{
        e.preventDefault()
        console.log('id :',idRef.current.value)
        console.log('pw :',pwRef.current.value)

        setUserData({
            'mem_id' : idRef.current.value,
            'mem_pw' : pwRef.current.value,
        })
    }

    const btnCk2 =(e)=>{
        e.preventDefault()
        setUserData({
            'mem_id' : idRef.current.value,
            'mem_pw' : pwRef.current.value,
            'mem_name' : nameRef.current.value,
            'mem_phone' : phoneRef.current.value,
            'ctr_id' : addrRef.current.value,
        })
    }

    // const loginFunc = () =>{

    //     const url = "http://localhost:8889/smart/members/login";
    //     axios
    //     .post(url, JSON.stringify(userData), {
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //     })
    //     .then((res, err) => {
    //         setCookie("x_auth", {
    //             user_id: res.data.user_id
    //         });
    //         console.log("x_auth" , getCookie("x_auth"));
    //         alert('로그인 성공~')
    //     })
    //     .catch((err) => {
    //         alert('실패다잇')
    //     });

        


    // }

    //    useEffect(()=>{
    //     console.log('현재 data',userData)
    //     // backend => 값을 보내줌 
    //     // userData.id !== undefined && alert(userData.id)

    //     if(Object.keys(userData).length !== 0 && userData.id !== '' && userData.pw !== ''){
    //         loginFunc();
            
    //         console.log("데이터",typeof(userData.id))
    //         setUserData({})
    //     }
        
    // },[userData])






    const joinFunc = () =>{
        console.log("로그인실행")
        console.log("로그인실행2", JSON.stringify(userData))
        const url = "http://localhost:8889/smart/members/join";
        axios
        .post(url, JSON.stringify(userData), {
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
        console.log('현재 data',userData)
        // backend => 값을 보내줌 
        // userData.id !== undefined && alert(userData.id)

        if(Object.keys(userData).length !== 0 &&
          userData.name !== '' && userData.pw !== '' ){
            joinFunc();
            
            setUserData({})
        }
        
    },[userData])


  
    return (
      <div className="hero">
        <div className="form-box">
          <div className="button-box">
            <div id="btn" ref={btn}></div>

            <button
              type="button"
              className="toggle-btn"
              onClick={loginHandler}
            >
              Log In
            </button>
            <button
              type="button"
              className="toggle-btn"
              onClick={registerHandler}
            >
              Register
            </button>
          </div>




          {/* 로그인 폼 구간 */}
          <form id="login" ref={login} className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="User Id"
              required
              ref={idRef}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              maxLength={20}
              required
              ref={pwRef}
            />
            <input type="checkbox" className="check-box" />
            <span>Remember Password</span>
            <button type="submit" className="submit-btn" onClick={btnCk} >
              Log In
            </button>
          </form>




          {/* 회원가입 폼 구간 */}
          <form id="register" ref={register} className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="User Id"
              required
              ref={idRef}
            />

            <input
              type="password"
              className="input-field"
              placeholder="Password"
              maxLength={20}
              required
              ref={pwRef}
            />

            <input
              type="name"
              className="input-field"
              placeholder="name"
              required
              ref={nameRef}
            />

            <input
              type="PhoneNumber"
              className="input-field"
              placeholder="PhoneNumber"
              required
              ref={phoneRef}
            />

            <input
              type="address"
              className="input-field"
              placeholder="address"
              required
              ref={addrRef}
            />

            {/* <input
              type="email"
              className="input-field"
              placeholder="E-Mail"
              required
              ref={emailRef}
            /> */}

            <input type="checkbox" className="check-box" />
            <span>I agree to terms & conditions</span>
            <button type="submit" className="submit-btn" onClick={btnCk2}>
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }


export default Login;
