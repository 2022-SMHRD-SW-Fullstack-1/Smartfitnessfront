import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-scroll'

import EquipBox from '../Components/EquipBox';
import TopBtn from '../Components/TopBtn';

const Equip = () => {

   //현재 month 포함한 url 값 세팅
  const url ="http://localhost:8889/smart/equipments/all"

  const [eqData,setEqData]=useState([])
  const cList = eqData.C
  const fList = eqData.F
  const mList = eqData.M

  
  //페이지 url 변경과 동시에 axios 실행
  useEffect(() => {
    axios.get(url)
    .then(res => {
      setEqData(res.data)
      console.log(res.data)
    });
    }, [url]);

  

  return (
    <div className='pagesDiv'>

      <h1>Equipments</h1>



      <div className='equipTitle'>
        <Link to ='cList' smooth={true} duration={500} >
          <EquipBox name='Cardio'></EquipBox>
        </Link>
        <Link to ='fList' smooth={true} duration={500} >
          <EquipBox name='Free Weight'></EquipBox>
        </Link>
        <Link to ='mList' smooth={true} duration={500} >
          <EquipBox name='Machine'></EquipBox>
        </Link>
      </div>

      <h1 id='cList'>Cardio</h1>

      <div className='equipList'>
      <div className='equipDiv' >
        {cList&&cList.map((item,idx)=>(<EquipBox key={item.em_name+idx} name={item.em_name} desc={item.em_part} img1 ={item.em_img1} img2 ={item.em_img2} video={item.em_video} type='0'/>))}
      </div>
      </div>

      <h1 id='fList'>Free weight</h1>
      <div className='equipList'>
      <div className='equipDiv'>
        {fList&&fList.map((item,idx)=>(<EquipBox key={item.em_name+idx} name={item.em_name} desc={item.em_part}  img1 ={item.em_img1} img2 ={item.em_img2} video={item.em_video} type='0'/>))}
      </div>
      </div>
     
      <h1 id='mList'>Machine</h1>
      <div className='equipList'>
      <div className='equipDiv'>
        {mList&&mList.map((item,idx)=>(<EquipBox key={item.em_name+idx} name={item.em_name} desc={item.em_part}  img1 ={item.em_img1} img2 ={item.em_img2} video={item.em_video} type='0'/>))}
      </div>
      </div>

      
    <TopBtn/>
    </div>
  )
}

export default Equip