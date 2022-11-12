import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TimeTable from '../Components/TimeTable';

const GxProgram = () => {

    // 현재 시간 출력해서 원하는 month 값 불러오기
    const date = new Date();
    const month = date.getMonth()+1;

    const [usedata,setUsedata] = useState({})

    //현재 month 포함한 url 값 세팅
    const url ="http://localhost:8889/smart/programs/timetable/"+month

    const [pgData,setPgData]=useState([])


    //페이지 url 변경과 동시에 axios 실행
    useEffect(() => {
      axios.post(url,{month:month},{body:{
        "Content-Type": "application/json"
      }})
          .then(res => {
              console.log("Gx페이지 axios then-->",res.data);
              setPgData(res.data)
          });
  }, [url]);


  return (
    
    <div className = 'pagesDiv'>

      {pgData.map((item,idx)=><TimeTable key={item+idx} 
      start={item.start_date}
      name={item.pg_name}
      weekday={item.weekday}
      max={item.pg_max_peo}
      curr={item.curr_num_peo}
      />)}



    </div>
  )
}

export default GxProgram