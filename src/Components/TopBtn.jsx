import React from 'react'
import { AiOutlineToTop } from "react-icons/ai";

const TopBtn = () => {

    const goToTop =()=>{
        window.scroll({
          top: 0, left: 0, behavior: 'smooth' });
      }

  return (
    <div className='topBtn' onClick={goToTop}>
    <AiOutlineToTop />
    <p>TOP</p>
    </div>
  )
}

export default TopBtn