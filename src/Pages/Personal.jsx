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
        {trainerData.map((item,idx)=><EquipBox className='ptListBox'
        key={item.trainer_name+idx} 
        name={item.trainer_name}
        info={item.trainer_info}
        desc={item.trainer_ment}
        img1={item.trainer_pic}
        seq={item.trainer_seq}
        type='1'
        price={'$'+item.trainer_price+".00(USD)"}
        />)}
      </div>


    </div>
  )
}

export default Personal