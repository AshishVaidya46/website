import React, {useContext,useState} from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';


 function PaymentForm({user, cart}) {
    const state = useContext(GlobalState)
    const stripe = useStripe()
    const elements = useElements()
    const [total] = state.userAPI.total
    const [token] = state.token 
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    const handleSubmit = async(e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    
    if(!error) {
        try{
            setLoading(true)
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:3000/api/payment_card",{
                amount: total *100,
                id
            })

            if(response.data.success){
                console.log("Successful Payment")
                await axios.post("/api/checkout_success",{
                    id, cart, user, total
                }, {
                    headers: {Authorization: token}
                })
                history.push(`/success/${id}`)
                
            }else{
                history.push(`/canceled/${id}`)
            }
            setLoading(false)
        }catch(error){
            console.log('Error',error)
        }       
    }else{
        console.log(error.message)
    }
}
if(loading) return <div className="products"><Loading /></div>

    return (
        <div>
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement/>
                        </div>
                    </fieldset>
                    <button className="btn btn-danger mt-1">Place your Order</button>
                </form>
                
        </div>
    );
}

export default PaymentForm;