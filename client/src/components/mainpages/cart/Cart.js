import React, {useContext, useEffect, useState} from 'react';
import {GlobalState} from '../../../GlobalState'; 
import axios from 'axios'
import RazorpayButton from './razorpayButton'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setcart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

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
        setcart([...cart])
        addToCart()
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setcart([...cart])
        addToCart()
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setcart([...cart])
            addToCart()
        }
    }

    if(cart.length === 0)
        return <h2 style={{textAlign: "center", fontSize: "Srem"}} > Cart Empty</h2>

    return (
        <div>
            {
                cart.map(product => (
                    <div class="card mb-3" style={{maxwidth: 540}}>
  <div class="row no-gutters">
    <div class="col-md-4">
        <img src={product.images.url} alt="" className="img_container" />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{product.title}</h5>
        <p class="card-text">₹{product.price * product.quantity}</p>
        <p class="card-text">{product.description}</p>
        <p class="card-text">{product.content}</p>
        <div className="amount">
            <button onClick={() => decrement(product._id)}> - </button>
                <span>{product.quantity}</span>
                <button onClick={() => increment(product._id)}> + </button>
        </div>

        <div className="delete" onClick={() => removeProduct(product._id)}>X</div>
        </div>
      </div>
    </div>
  </div>
                ))
            }

            <div className="total">
                <h3>Total: ₹ {total}</h3>
            </div>
            <RazorpayButton/>
        </div>
    )
}

export default Cart;