import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './Css/body.css'

import MenuBar from './Components/MenuBar/MenuBar'
import MainPage from './Pages/MainPage'
import GxProgram from './Pages/GxProgram'
import Personal from './Pages/Personal'
import Equip from './Pages/Equip'
import Booking from './Pages/Booking'
import Contact from './Pages/Contact'
import LoginPage from './Pages/LoginPage'
import Join from './Pages/Join'


const Main = () => {
  return (
    <div>

      {/* 메뉴바 상단 고정 */}
    <MenuBar/>

    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/gx-prog' element={<GxProgram/>}/>
      <Route path='/pt-class' element={<Personal/>}/>
      <Route path='/equip' element={<Equip/>}/>
      <Route path='/book' element={<Booking/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/join' element={<Join/>}/>
    </Routes>

    </div>
  )
}

export default Main