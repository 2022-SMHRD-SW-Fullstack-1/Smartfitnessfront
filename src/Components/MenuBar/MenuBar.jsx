import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../img/logo.png'
import { getCookie, removeCookie } from '../auth/cookie';

// 상단 헤더 메뉴바 컴포넌트


const MenuBar = () => {

  const [userState, setUserState] = useState();
  const navigate = useNavigate()

      // userState 값 변경 확인
      useEffect(()=>{
        if(getCookie("x_auth")===undefined){
            // 비로그인 경우(빨강)
            setUserState(false)
        }else{
            // 로그인한 경우(파랑)
            setUserState(true)
        }
        
    },[])


    const logoutBtn= ()=>{
      // 쿠키 삭제
      removeCookie('x_auth')
      // 페이지 새로고침
      window.location.replace('/')
      
  }

  const notice =()=>{
    if(userState===false){
      alert('로그인이 필요한 기능입니다')
      navigate('login')
    }else{
      navigate('book')
    }
  }



  return (
    <div>

        {/* 메뉴바 */}
        <nav className='menuBox'> 

          {/* 로고 출력 */}
          <a href='/' className='logo'><img src={logo} alt='로고'/></a>

          {/* 카테고리 클릭 시 이동 */}
          <ul className='menu'>
              <li><Link to='gx-prog'>GX</Link></li>
              <li><Link to='pt-class'>PT</Link></li>
              <li><Link to='equip'>Equipment</Link></li>
              <li><span onClick={notice} style={{cursor:'pointer'}}>Booking</span></li>
              <li><Link to='contact'>Contact Us</Link></li>
              <li className={userState ? 'loginnotic-none' : 'loginnotic'}><Link to='login'>login</Link></li>
              <li className={userState ? 'loginnotic-none' : 'loginnotic'}><Link to='join'>join</Link></li>
              <li className={userState ? 'loginnotic' : 'loginnotic-none'} onClick={logoutBtn}><Link>logout</Link></li>
              <li className={userState ? 'loginnotic' : 'loginnotic-none'}><Link to='mypage'>my page</Link></li>
          </ul>


        </nav>
    </div>
  )
}

export default MenuBar