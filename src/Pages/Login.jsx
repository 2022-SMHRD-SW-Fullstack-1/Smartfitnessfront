import axios from 'axios';
import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie, setCookie, removeCookie } from "../Components/auth/cookie";

const Login = () => {

    //backend 연동 url 생성
    const url = "http://localhost:8889/smart/members/login";

    const[loginData,setLoginData] = useState({});
    const idRef = useRef();
    const pwRef = useRef();

    const navigate = useNavigate();

    const [userState, setUserState] = useState();

    
    // 로그인 기록이 있다면 true, 없다면 false 

    // 로그인 버튼 활성화
    const LoginBtn =(e)=>{
        // form 보내기 기능 막기
        e.preventDefault();

        // 사용자 입력값 세팅
        setLoginData({
            'mem_id' : idRef.current.value,
            'mem_pw' : pwRef.current.value
        })
    }

    // 로그아웃 버튼
    const logoutBtn= ()=>{
        // 쿠키 삭제
        removeCookie('x_auth')
        // 페이지 새로고침
        window.location.reload();
    }

    const loginFun = () =>{
        

        axios
        .post(url, JSON.stringify(loginData), {
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then((res, err) => {
            setCookie("x_auth", {
                mem_data: res.data
            });
            console.log("backend에서 가져온 값 -->",res.data)
            alert(res.data.mem_id+' 님 환영합니다!')
            window.location.replace('/')
            
        })
        .catch((err) => {
            alert('아이디 혹은 비밀번호를 확인해주세요')
        });
    }

    useEffect(()=>{
        if(Object.keys(loginData).length !== 0 && 
        loginData.id !== '' && loginData.pw !== ''){
            loginFun();
            setLoginData({})
        
        console.log("UserState 값 -->",userState)
        }
    },[loginData])

    // userState 값 변경 확인
    useEffect(()=>{
        if(getCookie("x_auth")===undefined){
            // 비로그인 경우(빨강)
            setUserState(false)
        }else{
            // 로그인한 경우(파랑)
            setUserState(true)
        }
        
    },[url])


  return (
    <div className='pagesDiv'>
        
        <form onSubmit={LoginBtn} className={userState ? 'loginform-none' : 'loginform'}>
        <h2>Login</h2>
           
           <div>
            {/* <span>User Id </span> */}
            <input
                    type="text"
                    className="input-field"
                    placeholder="User Id"
                    required
                    ref={idRef}
            />
           </div>

            <div>
            {/* <span>User Pw </span> */}
            
            <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    maxLength={20}
                    required
                    ref={pwRef}
            />

            </div>

            <input type='submit' value='login'/>

        </form>

        <div className={userState ? 'loginnotic' : 'loginnotic-none'}>
            <p>이미 로그인 한 사용자 입니다.</p>
            <button onClick={logoutBtn}>로그아웃</button>
        </div>

    </div>
  )
}

export default Login