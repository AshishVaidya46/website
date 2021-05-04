import React, {useContext, useEffect, useState} from 'react';
import {GlobalState} from '../../../GlobalState'; 
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'

toast.configure();

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setcart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')

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
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setcart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setcart([...cart])
            addToCart(cart)
        }
    }

    const handleToken = async (token) =>{
        //console.log({total})
        const response = await axios.post("http://localhost:5000/api/checkout",{
            token,
            total
        });
        const {status} =response.data
        if (status === 'success') {
            toast('success! check email for details',
            {type: 'success'})  
        }else{
            toast('somthing went wrong', 
            {type: 'error'})
        }
    }

    if(cart.length === 0)
        return <h2 style={{textAlign: "center", fontSize: "Srem"}} > Cart Empty</h2>
    
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

              <label htmlFor="mobile">Mobile</label>
              <input type="text" name="mobile" id="mobile"
              className="form-control mb-2" value={mobile}
              onChange={e => setMobile(e.target.value)} />
            </form>

            <div className="total">
                <h4>Total: ₹ {total}</h4>
            </div>

            <StripeCheckout
            stripeKey= "pk_test_51ImeGQSJnujPryRaKxxMSM5GK4OQMGf3vVFrWAXm7nItnhK2skjB07EzfAt6YGMP6asIvRRGOiHHjO1EhOyxIGpS00oScOTt7w"
            token={handleToken}
            billingAddress
            shippingAddress 
            amount={total * 100}
             />

        </div>
      </div>

            
    )
}

export default Cart;