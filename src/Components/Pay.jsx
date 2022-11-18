
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {getCookie} from '../Components/auth/cookie'


function Pay(props) {

    const [userName,setUserName] =useState();
    const [userEmail,setUserEmail] =useState();
    const [userPhone,setUserPhone] =useState();
    // console.log(props.name)
    useEffect(()=>{
        setUserName(getCookie('x_auth').mem_data.mem_id)
        setUserEmail(getCookie('x_auth').mem_data.mem_email)
        setUserPhone(getCookie('x_auth').mem_data.mem_phone)
        console.log(getCookie('x_auth'))

    },[])


    const navigate = useNavigate();
    function onClickPayment() {
        /* STEP2. 결제 준비하기 */
        const { IMP } = window;
          IMP.init('imp11181568');
          const merchant_uid = 'merchant_' + new Date().getTime();
          const amount = Number(props.price);
          const data = {
              pg: 'html5_inicis', // PG사
              pay_method: 'card', // 결제수단
              merchant_uid: merchant_uid,  // 주문번호
              amount: amount, // 결제금액
              name: props.name, // 주문명
              buyer_email: userEmail,
              buyer_name: userName,
              buyer_tel: userPhone
            };

          /* STEP5-3. 결제 정보 검증 후 저장하기 */
          // 처음에 요청했던 금액 저장하기 (추후 검증을 위해)
          axios.post("http://localhost:8889/smart/payments/insertPaymentInfo", {
              merchant_uid: merchant_uid,  // 주문번호
              amount: amount,  // 결제금액
              imp_uid:"SF",
              buyer_email: userEmail,
          })
          .then((r) => {
              if(r.data == "ok"){
                  /* STEP3. 결제 요청하기 */
                  IMP.request_pay(data, function (response) { //callback
                      if (response.success) {
                          /* STEP4. 결제 정보 전달하기 */
                          axios.post("http://localhost:8889/smart/payments/complete", {
                           
                              imp_uid: response.imp_uid,
                              merchant_uid: response.merchant_uid
                          })
                          .then((r) => {
                              /* STEP6. 결제 응답 처리하기 */
                              if(r.data === "success"){ // 결제 성공 시 로직
                                console.log(userEmail)
                                  navigate("/OrderSuccess", {	
                                      state:{	
                                          imp_uid: response.imp_uid,	
                                          merchant_uid: response.merchant_uid
                                      }	
                                  });	
                              }else if(r.data === "vbankIssued"){
                                console.log(userEmail) // 가상계좌 발급 시 로직
                                  navigate("/VbankIssued", {	
                                      state:{
                                          imp_uid: response.imp_uid,	
                                          merchant_uid: response.merchant_uid
                                      }	
                                      
                                  });	
                              } else{
                                console.log(userEmail)
                                  alert('결제 실패: 결제 응답이 success가 아님');
                                  window.location.replace('/mypage')
                              }
                          })
                          .catch((e) => {
                              console.log(e);
                              window.location.replace('/mypage')
                          })
                      } else {
                        console.log(userEmail)
                          alert(`결제 실패: ${response.error_msg}`);
                          window.location.replace('/mypage')
                      }
                    });
              }else{
                console.log(userEmail)
                  alert('결제 실패: 결제 데이터 입력 실패');
                  window.location.replace('/mypage')
              }
          })
          .catch((e) => {
            console.log(userEmail)
              console.log(e);
          })
      }
      
      return (
          
          <Button onClick={onClickPayment}>PAY</Button>
          
      ); 
  }

export default Pay;