import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Postcode = (props) => {
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';


    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    props.setCompany({
      ...props.company,
      address:fullAddress,
  });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type='button' onClick={handleClick}>
      Fine Address
    </button>
  );
};

export default Postcode;