import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalState} from '../../../GlobalState'; 
import { useParams, Link } from 'react-router-dom'
import {Card} from 'react-bootstrap'
import { toast } from 'react-toastify'
import Loading from '../utils/loading/Loading';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51ImeGQSJnujPryRaKxxMSM5GK4OQMGf3vVFrWAXm7nItnhK2skjB07EzfAt6YGMP6asIvRRGOiHHjO1EhOyxIGpS00oScOTt7w');
toast.configure();


function Checkout() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [total] =state.userAPI.total
    const [user] = state.userAPI.user
    const params = useParams()
    const [token] = state.token
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const [props, setProps] = useState(false)
    const [delivery, setDelivery] = useState(true)
    const [payment, setPayment] = useState(false)
    const [card, setCard] = useState(false)
    const [addresss, setAddress] = useState({
        address: '', postalCode: '', mobile:''
    })

    useEffect(()=> {
        const getProps = () => {
            if(user.address !== null){
                setProps(true)
            }
        }
        getProps();
        return () => { setProps(false) };
    })
    const onChangeInput = e => {
        const {name, value} = e.target;
        setAddress({...addresss, [name]: value})
    }

    const handleCallback = () => {
        setCallback(true)
    }
    const handlePayment= () => {
        setDelivery(false)
    }
    const handleSave = async e => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.post(`/user/address/${params.id}`,{...addresss, },{
                headers:{Authorization:token}
            })
            setCallback(false)
            setAddress({ address:'', postalCode:'', mobile:''})
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const cashondelivery = () => {
        setPayment(true)
        setCard(false)
    }
    const carddelivery = () => {
        setCard(true)
        setPayment(false)

    }
    const handleCashOnDelivery = async() => {
        setLoading(true)
        const response = await axios.post('/api/cashcheckout',{
            total,
            cart,
            user
        }, {
            headers: {Authorization: token}
        })
         const {status} =response.data
        if (status === 'success') {
            setCart([])
            setLoading(false)
        }else{
            toast('somthing went wrong', 
            {type: 'error'})
        }
        
    }

    if(loading) return <div className="products"><Loading /></div>

    return (
        <>
                <div className="container">
                    <b>*IF THE ADDDRES DOES NOT CHANGE THEN REFRESH ONCES </b>
                        <Card style={{marginTop:15,backgroundColor:'pink', width: '18rem' }}>
                            <Card.Body>
                            <Card.Title>Shipping Address</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{user.address}</Card.Subtitle>
                            <Card.Text>{user.postalCode}</Card.Text>
                            <Card.Text>Contact:{user.mobile}</Card.Text>
                            </Card.Body>
                        </Card>
                    
        <div className="address">
        {
            callback ? 
            <form onSubmit={handleSave}>
              <h2>Shipping</h2>

              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address" required
              className="form-control mb-2" value={addresss.address}
              onChange={onChangeInput} />

              <label htmlFor="zipCode">Postal Code</label>
              <input type="text" name="postalCode" id="postalCode" required
              className="form-control mb-2" value={addresss.postalCode}
              onChange={onChangeInput} /> 

              <label htmlFor="mobile">Mobile</label>
              <input type="text" name="mobile" id="mobile" required
              className="form-control mb-2" value={addresss.mobile}
              onChange={onChangeInput} />
              <button className="btn btn-danger" type="submit">Save</button>
            </form>

            :
            <>{
                props?  <div onClick={handleCallback}>+Edit Addres</div>
                :            <div onClick={handleCallback}>+Add your Addres</div>

            }
            
</>
        }
        </div>
        <div className="row card_box">
        {
            cart.map( product => (
                <div key={product._id} className="products_card col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="product_box">
                <b title={product.title}>{product.title}</b>
                <br/>
                <span>₹{product.price}</span>
                <p>{product.description}</p>
                <p>@{product.content}</p>
            </div>
            <div className="product_img">
                <img src={product.images.url} alt="" />
            </div>   
                </div>
           
            ))
        }
        </div>
        <div className="total">
                <p>       Sub Total: ₹{total}</p>
                <p>Delivery Charges: ₹ 0.00</p>
                <h5>       Total: ₹{total}</h5>
        <div className="payment">
        {props && delivery ? <button className="btn btn-danger" onClick={handlePayment} style={{textDecoration: 'none', marginBottom:10}}>Proceed to payment</button>
        :  <div  className="row">
        <> 
        {
            payment ?
        <Card border="danger" style={{ width: '18rem', height: 'auto', marginBottom:10 }}>
            <Card.Header>Cash On Delivery</Card.Header>
            <Card.Body>
            <Link to ={`/success_cash/${user._id}`}>
                <button className="btn btn-danger" onClick={handleCashOnDelivery} >Place your Order</button>
            </Link>
            </Card.Body>
        </Card>
        :<button onClick={cashondelivery}>
        <Card border="danger" style={{ width: '18rem', marginBottom:10 }}>
            <Card.Header>Cash On Delivery</Card.Header>
            <Card.Body>Cash Payment </Card.Body>
        </Card>
        </button>
        }
        </>
        {
            card ? <Card border="danger" style={{ width: '18rem' }}>
            <Card.Header>Card Payment</Card.Header>
            <Card.Body><Elements stripe={stripePromise}>
                    <PaymentForm user={user} cart={cart}/>
                </Elements>
            </Card.Body>
        </Card>
        : 
        <button onClick={carddelivery}>
        <Card border="danger" style={{ width: '18rem' }}>
            <Card.Header>Card Payment</Card.Header>
            <Card.Body>
               pay securely with your card
            </Card.Body>
        </Card>
        </button>
        }
        </div>
}        </div>

        </div>
        </div>
        </>
    );
}

export default Checkout;
