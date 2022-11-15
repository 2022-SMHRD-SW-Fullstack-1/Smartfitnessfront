import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { getCookie } from './auth/cookie';
import MyBooksTb from './MyBooksTb';

const MyBooks = () => {

    const date = new Date()
    const month = date.getMonth()+1
    const [bookData,setBookData]=useState()

    const url = "http://localhost:8889/smart/programs/"+getCookie("x_auth").mem_data.mem_id+"/timetable/"+month

    // 예약 현황 보여주기

    useEffect(()=>{
        
        axios.get(url,{
            mem_id:getCookie("x_auth").mem_data.mem_id,
            token:getCookie("x_auth").mem_data.accessToken
        }).then((res,err)=>{
            console.log("myBooks then==>",res.data)
            setBookData(res.data)
        }).catch(err=>{
            console.log("myBooks catch==>",err)
        })
    },[url])
    

    
    



  return (
    <div className='myBooksDiv'>

        <table className='myBooksTable'>
            <tbody>
                <tr>
                    <td>Start Date</td> <td>End Date</td> <td>Subject</td> <td>Cancel</td>
                </tr>

                {bookData&&bookData.map((item,idx)=> <MyBooksTb key={item+idx} 
                start={item.start}
                end={item.end}
                name={item.pg_name}
                seq={item.curr_pg_seq}/>)}
                
            </tbody>
        </table>


    </div>
  )
}

export default MyBooks