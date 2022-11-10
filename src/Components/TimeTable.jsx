import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TimeTable = (props) => {

  const date = new Date();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const weekday = date.getDay();

  
  console.log("timetable props 값 -->",props.timeData)

  const weekdays =['일','월','화','수','목','금','토']

  

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
          <div className="panel-content">
          <table className='timeTable'>
        <tbody>
          <tr>
            <td>Date</td>
            <td>Subject</td>
          </tr>
         {/* map함수로 timetable 출력 */}
          {props.timeData.map((item,idx) => {return(
          // 보내준 값 조합하여 url로 보내주기(팝업으로 변경 가능?)
            <tr key={item.start_time+idx}>
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
        
        </div>
        </TabPanel>))}

        {/* {props.timeData.map((item,idx) =>{return(
          <div></div>
        )}} */}
      </Tabs>
    </div>


    // <div className='progDiv'>
    // <table className='timeTable'>
    //   <tbody>

    //     <tr>
    //       <td>Date</td>
    //       <td>Subject</td>
    //     </tr>

    //     {/* map함수로 timetable 출력 */}

    //     {props.timeData.map((item,idx) => {return(

    //       // 보내준 값 조합하여 url로 보내주기(팝업으로 변경 가능?)
    //         <tr key={item.start_time+idx}>

    //           <td>
    //             {item.start_date.substring(2, 4)}월
    //             {item.start_date.substring(4, 6)}일
    //             ({weekdays[item.weekday]})
    //             {item.start_time.substring(0, 2)}시

    //           </td>

    //           <td>{item.pg_name}</td>
    //         </tr>
    //     )})}
        
    //   </tbody>
        
    // </table>
    // </div>
  )
}

export default TimeTable