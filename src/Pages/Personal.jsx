import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EquipBox from '../Components/EquipBox'

const Personal = () => {

  const url ="http://localhost:8889/smart/programs/trainer/rank"

  const [trainerData,setTrainerData]=useState([{}])


  useEffect(() => {
    axios.get(url)
        .then((res,err) => {
          setTrainerData(res.data)
            console.log("트레이너 페이지 axios then-->",res.data);
        }).catch(err=>{
          console.log(err)
        });
}, [url]);


  return (
    <div className='pagesDiv'>
      <h1>Personal Training</h1>

      <div className='ptList'>
        {trainerData.map((item,idx)=><EquipBox key={item.trainer_name+idx} 
        name={item.trainer_name}
        info={item.trainer_info}
        desc={item.trainer_ment}
        img={item.trainer_pic}
        price={item.trainer_price+'원'}
        />)}
      </div>


    </div>
  )
}

export default Personal