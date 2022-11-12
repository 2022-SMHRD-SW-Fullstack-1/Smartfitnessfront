import React from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TimeTable = (props) => {

  const date = new Date();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const weekday = date.getDay();

  
  console.log("timetable props 값 -->",props.timeData)

  const weekdays =['일','월','화','수','목','금','토']

  const navigate = useNavigate();

  const bookBtn =(e)=>{
    console.log("e찍기-->",e)
    // navigate("book?date="+e.start_date+"&time="+e.start_time+"&name="+e.pg_name+"&num=")

  }

  

  return (

    <div className="gxProgDiv">
      <h1>GX Programs</h1>
      <Tabs className="tabDiv">

        
        {/* <TabList className="tabList">
          <Tab><p>{month}월 {day}일 ({weekdays[weekday]})</p></Tab>
          <Tab><p>{month}월 {day+1}일 ({weekdays[weekday+1]})</p></Tab>
          <Tab><p>{month}월 {day+2}일 ({weekdays[weekday+2]})</p></Tab>
          <Tab><p>{month}월 {day+3}일 ({weekdays[weekday+3]})</p></Tab>
          <Tab><p>{month}월 {day+4}일 ({weekdays[weekday+4]})</p></Tab>

        </TabList> */}

        {props.timeData.map((item,idx)=>(

        <TabPanel>

          <table className='timeTable'>

          <tbody>
            <tr>
              <th><h1>Date</h1></th>
              <th><h1>Subject</h1></th>
            </tr>
            {props.timeData.map((item,idx) => {return(
              
              <tr
              key={item.start_time+idx}
              onClick={bookBtn=>{
                navigate("book?date="+item.start_date+"&time="+item.start_time+"&name="+item.pg_name+"&num="+item.weekday)
              }}>

                  <td>
                    {item.start_date.substring(2, 4)}월
                    {item.start_date.substring(4, 6)}일
                    ({weekdays[item.weekday]})
                    {item.start_time.substring(0, 2)}시
                  </td>

                  <td>{item.pg_name}</td>
                
                </tr>
          )})}
          
          </tbody>
            
        </table>
        

        </TabPanel>))}

      </Tabs>
    </div>


  )
}

export default TimeTable