import React from 'react';
import { Link } from 'react-router-dom';


const Success = () => {
  return(
        <div>
            <h1>Thank You For your order</h1>
            <p>We are currenty processing your order and 
            will send you a confirmation email shortyly
            </p>
            <div>
                <Link className="btn btn-danger" to="/">continue for Shopping</Link>
            </div>
        </div>
    )
}

export default Success;