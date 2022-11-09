
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {getCookie} from '../Components/auth/cookie'


function Pay() {

    const [memData,setMemData]=useState([{}])

    useEffect(()=>{
        setMemData(getCookie("x_auth").mem_data)
    },[])
    
    console.log("pay창에서 데이터 찍기-->",memData)
    console.log("pay창에서 데이터 찍기-->",memData.mem_email)

  const navigate = useNavigate();
  function onClickPayment() {
      /* STEP2. 결제 준비하기 */
      const { IMP } = window;
        IMP.init('imp11181568');
    
        const merchant_uid = 'merchant_' + new Date().getTime();
        const amount = 100;
        const data = {
            pg: 'html5_inicis', // PG사
            pay_method: 'card', // 결제수단
            merchant_uid: merchant_uid,  // 주문번호
            amount: amount, // 결제금액
            name: "PT", // 주문명
            buyer_email: memData.mem_email,
            buyer_name: memData.mem_name,
            buyer_tel: memData.mem_phone
        };
        /* STEP5-3. 결제 정보 검증 후 저장하기 */
		// 처음에 요청했던 금액 저장하기 (추후 검증을 위해)
        axios.post("http://localhost:8889/smart/payments/insertPaymentInfo", {
            merchant_uid: merchant_uid,  // 주문번호
            amount: amount,  // 결제금액
            imp_uid:"SF",
            buyer_email: memData.mem_email,
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
                                navigate("/OrderSuccess", {	
                                    state:{	
                                        imp_uid: response.imp_uid,	
                                        merchant_uid: response.merchant_uid
                                    }	
                                });	
                            }else if(r.data === "vbankIssued"){ // 가상계좌 발급 시 로직
                                navigate("/VbankIssued", {	
                                    state:{
                                        imp_uid: response.imp_uid,	
                                        merchant_uid: response.merchant_uid
                                    }	
                                });	
                            } else{
                                alert('결제 실패: 결제 응답이 success가 아님');
                            }
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                    } else {
                        alert(`결제 실패: ${response.error_msg}`);
                    }
                  });
            }else{
                alert('결제 실패: 결제 데이터 입력 실패');
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }
    
    return (
        
        <Button onClick={onClickPayment}>PAY</Button>
        
    ); 
}


export default Pay;