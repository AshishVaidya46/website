/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext, useEffect, useState} from 'react';
import {GlobalState} from '../../../GlobalState'; 
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import Empty_cart from '../../headers/icon/empty_cart.jpg'
import {Button} from 'react-bootstrap'

toast.configure();

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [userID] = state.userAPI.userID
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [mobile, setMobile] = useState('')
    const [props, setProps] = useState(false)
    const [callback, setCallback] =state.userAPI.callback

    useEffect(() => {

        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }
        getTotal()
    },[cart])

    const addToCart = async () =>{

        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }
    
    const handleCashOnDelivery = async() => {
         await axios.post('/api/cashcheckout',{
            total,
            cart,
            address,
            zipCode,
            mobile,
            userID
        });
       // const {status} =response.data
        //if (status === 'success') {
            setCart([])
            addToCart('')
           // toast('You have successfully placed an order.',
            //{type: 'success'})  
            setCallback(!callback)
       /* }else{
            toast('somthing went wrong', 
            {type: 'error'})
        }*/
        
    }

    const handleToken = async (payments) =>{
       await axios.post('/api/checkout',{
            payments,
            total,
            cart,
            mobile,
            userID
        });

        //const {status} =response.data
        //if (status === 'success') {
            setCart([])
            addToCart('')
            //toast('You have successfully placed an order.',
            //{type: 'success'})  
            setCallback(!callback)
        /*}else{
            toast('somthing went wrong', 
            {type: 'error'})
     }*/
    }

    const handlePayment = () => {
        if(!address || !mobile || !zipCode)
        return alert("Pleasw add address and mobile Number")
       
        setProps(true)
    }
    if(cart.length === 0)
        return  <img className="img-responsive w-100" src={Empty_cart} alt="not empty"/>
    
    return (
        <div className="row mx-auto">
          <title>Cart Page</title>

        <div className="col-md-8 text-secondary table-responsive my-3">
          <h2 className="text-uppercase">Shopping Cart</h2>

          <table className="table my-3">
            <tbody>
              {
                cart.map(product => (
                    <tr>
            <td style={{width: '100px', overflow: 'hidden'}}>
                <img src={product.images.url} alt=""
                className="img-thumbnail w-100"
                style={{minWidth: '80px', height: '80px'}} />
            </td>

            <td style={{minWidth: '200px'}} className="w-50 align-middle" >
                <h5 className="text-capitalize text-secondary">
                    <Link href={`/product/${product._id}`}>
                        <a href>{product.title}</a>
                    </Link>
                </h5>

                <h6 className="text-danger">₹{product.price * product.quantity}</h6>
            </td>

            <td className="align-middle" style={{minWidth: '150px'}}>
                <button className="btn btn-outline-secondary"
                 onClick={() => decrement(product._id)}> - </button>

                <span className="px-3">{product.quantity}</span>

                <button className="btn btn-outline-secondary"
                onClick={() => increment(product._id)}> + </button>
            </td>

            <td className="align-middle" style={{minWidth: '50px', cursor: 'pointer'}}>
                <i className="far fa-trash-alt text-danger" aria-hidden="true" 
                style={{fontSize: '18px'}} data-toggle="modal" data-target="#exampleModal"
                onClick={() => removeProduct(product._id)} >x</i>
            </td>
        </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
            <form>
              <h2>Shipping</h2>

              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address"
              className="form-control mb-2" value={address}
              onChange={e => setAddress(e.target.value)} />

              <label htmlFor="address">Postal Code</label>
              <input type="text" name="Poatal Code" id="Postal Code"
              className="form-control mb-2" value={zipCode}
              onChange={e => setZipCode(e.target.value)} /> 

              <label htmlFor="mobile">Mobile</label>
              <input type="text" name="mobile" id="mobile"
              className="form-control mb-2" value={mobile}
              onChange={e => setMobile(e.target.value)} />
            </form>

            <div className="total">
                <h4>Total: ₹ {total}</h4>
            </div>

            {
                !props ?
                <div className="coloum">
                <div>
            <StripeCheckout
            className="btn btn-dark my-2"
            stripeKey= "pk_test_51ImeGQSJnujPryRaKxxMSM5GK4OQMGf3vVFrWAXm7nItnhK2skjB07EzfAt6YGMP6asIvRRGOiHHjO1EhOyxIGpS00oScOTt7w"
            token={handleToken}
            billingAddress
            shippingAddress 
            amount={total * 100}
             /></div>
             <div>
                <Button onClick={handleCashOnDelivery} variant="dark">cash on delivery</Button>
            </div>
            </div>
             :
             <a className="btn btn-dark my-2" onClick={handlePayment}>Proceed with payment</a>
            }
            
            
        </div>
      </div>

            
    )
}

export default Cart;