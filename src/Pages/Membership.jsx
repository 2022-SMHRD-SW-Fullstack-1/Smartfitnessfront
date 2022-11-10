import React from 'react'
import Pay from '../Components/Pay'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";

const Membership = () => {


  return (
    <div className='pagesDiv'>
        <h1>Membership</h1>
        <div className='membership'>
            <div>
                <h3>Basic</h3>
                <p>+ 30days Membership</p>
                <p>+ Free Locker</p>
                <Pay name='basic' price='100'/>
            </div>
            <div>
                <h3>Basic<span>+</span></h3>
                <p>+ 30days Membership</p>
                <p>+ Free Locker</p>
                <p>+ Available to Booking</p>
                <Pay name='basic+' price='100'/>
            </div>
            <div>
                <h3>Premium</h3>
                <p>+ 45days Membership</p>
                <p>+ Free Locker</p>
                <p>+ Available to Booking</p>
                <p>+ Free Personal Training (twice)</p>
                <Pay name='Premium' price='500'/>
            </div>

        </div>
    </div>
  )
}

export default Membership