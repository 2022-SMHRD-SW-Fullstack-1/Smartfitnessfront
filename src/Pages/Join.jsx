import React from 'react'
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import * as Yup from "yup";
import {Formik} from "formik";
import {Button, TextField} from "@mui/material";
import { useState } from 'react';
import Postcode from '../Components/PostCode';
import { useRef } from 'react';
import { useEffect } from 'react';


const Join = () => {
  const url = "http://localhost:8889/smart/members/join"

  const [joinData,setJoinData]=useState({});

  const idRef = useRef()
  const pwRef = useRef()
  const nameRef = useRef()
  const phoneRef = useRef()
  const addrRef = useRef()
  const emailRef = useRef()
  
  
  const validationSchema = Yup.object().shape({

    mem_email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("필수 입력 사항입니다."),


    mem_name: Yup.string()
      .min(2, "이름은 최소 2글자 이상입니다!")
      .max(10, "이름은 최대 10글자입니다!")
      .matches(
        /^[가-힣a-zA-Z][^0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        "정확한 이름을 입력해주세요!"
      )
      .required("필수 입력 사항입니다."),

    mem_phone: Yup.string()
      .min(10, "전체 휴대폰 번호를 입력해주세요")
      .max(11, "휴대폰 번호는 11자리를 넘을 수 없습니다")
      .matches(
        /^[0-9][^가-힣a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        "숫자만 입력 가능합니다"
      )
      .required("필수 입력 사항입니다."),


      mem_id: Yup.string()
      .min(4, "아이디는 최소 4글자 이상입니다!")
      .max(10, "아이디는 최대 10글자입니다!")
      .matches(
        /^[a-zA-Z0-9][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        "아이디는 영어, 숫자로만 입력 가능합니다!"
      )
      .required("필수 입력 사항입니다."),


    mem_pw: Yup.string()
      .min(8, "비밀번호는 최소 8자리 이상입니다")
      .max(16, "비밀번호는 최대 16자리입니다!")
      .required("필수 입력 사항입니다.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
        "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
      ),


    password2: Yup.string()
      .oneOf([Yup.ref("mem_pw"), null], "비밀번호가 일치하지 않습니다!")
      .required("필수 입력 사항입니다."),
      
      
    addr2: Yup.string()
    .min(0, "Must write full address")
    .required("필수 입력 사항입니다.")
  });



  

  const sendJoin = (e) => {
    e.preventDefault();

    setJoinData({
      'mem_id' : idRef.current.value,
      'mem_pw' : pwRef.current.value,
      'mem_name' : nameRef.current.value,
      'mem_email' : emailRef.current.value,
      'mem_phone' : phoneRef.current.value,
      'mem_addr' : addrRef.current.value
  })
  }

  useEffect(()=>{},[joinData])
    // axios.post(url, {
    //     mem_id : mem_id,
    //     mem_pw : mem_pw,
    //     mem_name : mem_name,
    //     mem_email : mem_email
    //   });
    //   alert(<h3>Welcome!<br/>Do Login Do More!😎</h3>);
  //   catch (e) {
  //     // 서버에서 받은 에러 메시지 출력
  //     alert(e.response.data.message + "😭");
  //   }
  // };


  const [enroll_company, setEnroll_company] = useState({
    address:'',
  });
  
  
  const handleInput = (e) => {
    setEnroll_company({
        ...enroll_company,
          [e.target.name]:e.target.value,
      })
  }
  






  return (
    <div className='pagesDiv'>
          <h1>Become a Member!</h1>
    
    
    
    
    <Formik
      initialValues={{
        mem_email: "",
        mem_name: "",
        mem_pw: "",
        password2: "",
      }}
      validationSchema={validationSchema}
      onSubmit={sendJoin}
      validateOnMount={true}
    >
      {({values, handleSubmit, handleChange, errors}) => (
        <div className="signup-wrapper">
          <ToastContainer/>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-forms">
              

              <div className="input-forms-item">
                <div className="input-label">User Id</div>
                <TextField
                  value={values.mem_id}
                  name="mem_id"
                  placeholder='Id'
                  variant="outlined"
                  onChange={handleChange}
                />
                <div className="error-message">
                  {errors.mem_id}
                </div>
              </div>

              <div className="input-forms-item">
                <div className="input-label">Password</div>
                <TextField
                  value={values.mem_pw}
                  name="mem_pw"
                  placeholder='Password'
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />
                <div className="error-message">
                  {errors.mem_pw}
                </div>
              </div>


              <div className="input-forms-item">
                <div className="input-label">Verify Password</div>
                <TextField
                  value={values.password2}
                  name="password2"
                  placeholder='Verify Password'
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />
                <div className="error-message">
                  {errors.password2}
                </div>
              </div>




              <div className="input-forms-item">
                <div className="input-label">User Name</div>
                <TextField
                  value={values.mem_name}
                  name="mem_name"
                  placeholder='Full Name'
                  variant="outlined"
                  onChange={handleChange}
                />
                <div className="error-message">
                  {errors.mem_name}
                </div>
              </div>


              <div className="input-forms-item">
                <div className="input-label">Mobile</div>
                <TextField
                  value={values.mem_phone}
                  name="mem_phone"
                  placeholder='Mobile'
                  variant="outlined"
                  onChange={handleChange}
                />
                <div className="error-message">
                  {errors.mem_phone}
                </div>
              </div>


              <div className="input-forms-item">
              <div className="input-label">Address</div>
              
              <br/>
              { <Postcode company={enroll_company} setCompany={setEnroll_company}></Postcode>}
              <br/>

              <TextField
                  value={enroll_company.address}
                  name="address"
                  placeholder='Find your Address'
                  variant="outlined"
                  onChange={handleChange}
                />
              {/* <input className="user_enroll_text" placeholder="Address"  type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address}/> */}

              <TextField
                  value={values.addr2}
                  name="addr2"
                  placeholder='Detail Address'
                  variant="outlined"
                  onChange={handleChange}
                />
                <div className="error-message">
                  {errors.addr2}
                </div>
              
              </div>


              <Button
                color="primary"
                variant="contained"
                // fullWidth
                onClick={sendJoin}
              >
                join
              </Button>
            </div>
          </form>
        </div>
      )}
    </Formik>





    </div>
  )
}

export default Join