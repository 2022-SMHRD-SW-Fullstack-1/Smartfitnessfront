import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import {getCookie} from './auth/cookie'

const QnA = () => {

    const [reqId,setReqId] = useState('guest');
  const [files,setFiles] = useState([]);

  const typeRef = useRef()
  const titleRef = useRef()
  const messageRef = useRef()
  const fileRef = useRef([])

  const [userData, setUserData] = useState([{

  }])





      const handleSubmit = (e) => {
        e.preventDefault()

        setUserData({
          'mem_id' : reqId,
          'qna_file' : fileRef.current.value,
          'qna_title' : titleRef.current.value,
          'qna_contents' : messageRef.current.value
        })        

        sendQue()
      };

      const sendQue =()=>{
        const url = 'http://localhost:8889/smart/qna/que'
        axios
        .post(url,JSON.stringify(userData), {
          headers: {
          "Content-Type": "application/json",
          },
      })
        .then(()=>{
          console.log(userData)
          console.log('then')
        })
        .catch(()=>{console.log('catch')})
      }
  


  useEffect(()=>{
    getCookie('x_auth')!=null&&setReqId (getCookie('x_auth').mem_id)
  },[])
  return (
    <div id='contact'>
        <h1>CONTACT US</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">

            <select ref={typeRef} >
              <option value="" selected disabled hidden>  select your question </option>
              <option value="1">1. 사이트 이용 문의</option>
              <option value="2">2.회원권 관련 문의</option>
              <option value="3">3.불편사항/신고 접수</option>
              <option value="4">4.회원탈퇴</option>
              <option value="5">5. 기타문의</option>
            </select>
            
            <input type='text' value='To. Admin ' readOnly/>
            <input type='text' value={'From. '+reqId} readOnly name='mem_id'/>
            <input type='text' placeholder='TITLE'ref={titleRef} required/>
            <textarea placeholder='Write Here' ref={messageRef}></textarea>
            <input type='file' multiple ref={fileRef}/>
            <input type='submit' value='Send'/>
        </form>
    </div>
  )
}

export default QnA