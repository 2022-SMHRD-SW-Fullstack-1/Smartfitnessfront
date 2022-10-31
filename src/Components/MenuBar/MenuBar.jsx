import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/logo.png'

// 상단 헤더 메뉴바 컴포넌트


const MenuBar = () => {
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
              <li><Link to='book'>Booking</Link></li>
              <li><Link to='contact'>Contact Us</Link></li>
          </ul>

        </nav>
    </div>
  )
}

export default MenuBar