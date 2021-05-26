import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'


function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()
    useEffect(() => {
        if(params.id){
            history.forEach(item => {
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id,history])

    const handleDelivered = async (id) => {
        await axios.put('/api/checkout',{id})
    }

    const handlePaid = async (id) => {
        await axios.put('/api/paidcheckout', {id})
    }
   //console.log(orderDetails)
    if(orderDetails.length === 0) return null
    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                {
                    orderDetails.method === 'card' 
                    ? <tr>
                        <td>{orderDetails.name}</td>
                        <td>{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                        <td>{orderDetails.address.postal_code}</td>
                        <td>{orderDetails.contact}</td>
                    </tr>
                    : <tr>
                        <td>{orderDetails.name}</td>
                        <td>{orderDetails.address}</td>
                        <td>{orderDetails.zipCode} </td>
                        <td>{orderDetails.contact} </td>
                    </tr>
                }
                    
                </tbody>
            </table>

            <br/>
            
            <div className={`alert ${orderDetails.delivered ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-item-center`} role="alert">
                            {
                                orderDetails.delivered ? `Delivered on ${orderDetails.updatedAt}`  : 'Packge Will be Delivered within 4 Days!!'
                            }
                            {
                                isAdmin && ! orderDetails.delivered &&
                                <button className="btn btn-dark text-upercase"
                                onClick={() => handleDelivered(orderDetails._id)}>
                                    Mark as delivered
                                </button>
                            }
            </div>

            <h3>Payment</h3>
            <div className={`alert ${orderDetails.paid === 'true' ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-item-center`} role="alert">
                            {
                                orderDetails.paid === 'true' ? `Paid on ${new Date(orderDetails.createdAt).toLocaleDateString()}`  : 'Not Paid'
                            }
                            
                            {
                                isAdmin && orderDetails.paid === 'false' &&
                                <button className="btn btn-dark text-upercase"
                                onClick={() => handlePaid(orderDetails._id)}>
                                    Mark as Paid
                                </button>
                            }
            </div>
            
            <table style={{margin: "30px 0px"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th >Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        orderDetails.cart.map(item =>(
                        <tr key={item._id}>
                            <td><img src={item.images.url} alt="" /></td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price * item.quantity}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails;