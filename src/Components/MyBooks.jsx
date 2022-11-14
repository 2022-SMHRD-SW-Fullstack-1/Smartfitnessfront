import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { getCookie } from './auth/cookie';
import MyBooksTb from './MyBooksTb';

const MyBooks = () => {

    const mem_id = getCookie("x_auth").mem_data.mem_id;
    const token = getCookie("x_auth").mem_data.accessToken
    const date = new Date()
    const month = date.getMonth()+1
    const [bookData,setBookData]=useState()

    const url = "http://localhost:8889/smart/programs/"+mem_id+"/timetable/"+month

    useEffect(()=>{
        
        console.log("mem_id 찍어보기2 -->",mem_id)
        
        axios.get(url,{
            mem_id,
            token
        }).then((res,err)=>{
            console.log("myBooks then==>",res.data)
            setBookData(res.data)
        }).catch(err=>{
            console.log("myBooks catch==>",err)
        })
    },[url])
    

    
    



  return (
    <div>

        <table className='myBooksTable'>
            <tbody>
                <tr>
                    <td>Start Date</td> <td>End Date</td> <td>Subject</td> <td>Cancel</td>
                </tr>

                {bookData&&bookData.map((item,idx)=> <MyBooksTb key={item+idx} 
                start={item.start}
                end={item.end}
                name={item.pg_name}
                seq={item.pg_seq}/>)}
                
            </tbody>
        </table>


    </div>
  )
}

export default MyBooks