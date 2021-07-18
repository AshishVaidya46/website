/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext, useState} from 'react';
import {GlobalState} from '../../../GlobalState'; 
import axios from 'axios'
//import StripeCheckout from 'react-stripe-checkout'
import { toast } from 'react-toastify'
import Empty_cart from '../../headers/icon/empty_cart.jpg'
import {Link} from 'react-router-dom'
import Loading from '../utils/loading/Loading';

toast.configure();

function Cart() {
    const state = useContext(GlobalState)
  /**/  let [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total] = state.userAPI.total
    //const [callback, setCallback] =useState([])
    const [loading] = useState(false)
    const [user] = state.userAPI.user


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

 /*   const handleToken = async (payments) =>{
       // console.log(payments)
        setLoading(true)
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
            setLoading(false)
        }else{
            toast('somthing went wrong', 
            {type: 'error'})
     }
    }*/


    if(cart.length === 0)
        return  <img className="img-responsive w-100" src={Empty_cart} alt="not empty"/>

    if(loading) return <div className="products"><Loading /></div>
    
    
    return (
        <div className="row mx-auto">
          <title>Cart Page</title>

        <div className="col-md-8 text-secondary table-responsive my-3">
          <h2 className="text-uppercase">Shopping Cart</h2>

          <table className="table my-3">
            <tbody>
              {
                cart.map(product => (
                    <tr key={product._id}>
            <td style={{width: '100px', overflow: 'hidden'}}>
                <img src={product.images.url} alt=""
                className="img-thumbnail w-100"
                style={{minWidth: '80px', height: '80px'}} />
            </td>

            <td style={{minWidth: '200px'}} className="w-50 align-middle" >
                <h5 className="text-capitalize text-secondary">
                        {product.title}
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
        
        <div className="col-md-4 my-3 text-right text-capitalize text-secondary">

            <div className="total">
                <p>       Sub Total: ₹{total}</p>
                <p>Delivery Charges: ₹ 0.00</p>
                <h5>       Total: ₹{total}</h5>
            </div>
            <Link className="btn btn-danger" to={`/cart/checkout/${user._id}`}>Proceed to checkout</Link>
        </div>
      </div>     
    )
}

export default Cart;