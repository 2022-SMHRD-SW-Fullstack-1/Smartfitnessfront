import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './Scss/body.scss'
import './Scss/components.scss';
import './Scss/join.scss';
import './Scss/page.scss';
import './Scss/login.scss';
import './Components/Calendar/custom.module.css'

import MenuBar from './Components/MenuBar/MenuBar'
import MainPage from './Pages/MainPage'
import GxProgram from './Pages/GxProgram'
import Personal from './Pages/Personal'
import Equip from './Pages/Equip'
import Booking from './Pages/Booking'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Join from './Pages/Join'
import Mypage from './Pages/Mypage';
import Membership from './Pages/Membership';
import { getCookie } from './Components/auth/cookie';
import Footer from './Components/Footer';
import GxBook from './Pages/GxBook';
import BookEq from './Pages/BookEq';
import PtInfo from './Pages/PtInfo';


const Main = () => {

// console.log(getCookie("x_auth"))

const [loginState,setLoginState]=useState();




  return (
    <>

      {/* 메뉴바 상단 고정 */}
    <MenuBar/>

    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/gx-prog' element={<GxProgram/>}/>
      <Route path='/gx-prog/book/*' element={<GxBook/>}/>
      <Route path='/pt-class' element={<Personal/>}/>
      <Route path='/equip' element={<Equip/>}/>
      <Route path='/book' element={<Booking/>}/>
      <Route path='/pt-info/*' element={<PtInfo/>}/>
      <Route path='/book-eq/*' element={<BookEq/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/join' element={<Join/>}/>
      <Route path='/mypage' element={<Mypage/>}/>
      <Route path='/membership' element={<Membership/>}/>
      {/* <Route path='/join' element={<Join/>}/> */}
    </Routes>


    <Footer/>
    </>
  )
}

export default Main