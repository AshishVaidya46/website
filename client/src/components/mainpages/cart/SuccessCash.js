import React, { useEffect, useContext } from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { GlobalState } from '../../../GlobalState';

function SuccessCash() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart

    const handleCart = () => {
        if(cart !== 0)
        setCart([])
    }
    return (
        <div>
            <h1>Thank You For your order</h1>
            <p>We are currenty processing your order and 
            will send you a confirmation email shortyly
            </p>
            <div>
                <Link 
                to='/'>
                <Button className="btn btn-dark my-2" onClick={handleCart}>
                Continue for shopping...
                </Button>
                </Link>
            </div>
        </div>
    );
}

export default SuccessCash;