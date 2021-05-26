/*const express = require("express");
const stripe = require('stripe')("sk_test_51ImeGQSJnujPryRaIZ4vPJhc1sgHpyq5BDTOxtcwZlFjomQqIdCNqXlVvlghs6dfcSRil1lqzYSZ5G52GT7y9GLC00IWGgecSF")
const uuid = require('uuid').v4
const router = express.Router();
const PaymentModel = require('../models/paymentModel')


const paymentCtrl = {
    getPayments: async(req, res) =>{
        try {
            const  paymentModel = await PaymentModel.find()
            res.json(paymentModel)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        let Checkout;
        let error;
        let status;
        try {
            const { payments, total, cart} = req.body;
    
            const customer = await stripe.customers.create({
                email: payments.email,
                name: payments.card.name,
                address: {
                    line1: payments.card.address_line1,
                    line2: payments.card.address_line2,
                    city: payments.card.address_city,
                    country: payments.card.address_country,
                    postal_code: payments.card.address_zip,
                } 
            });
    
            const idempotencyKey = uuid();
            const intent = await stripe.paymentIntents.create({
                amount: total * 100,
                currency: 'INR',
                customer: customer.id,
            },{
                idempotencyKey
            });
    
            const intents = await stripe.paymentIntents.confirm(intent.id,
                {
                    payment_method:'pm_card_visa'
                })
            //console.log(intents)
            const order = new PaymentModel({
                user_id:customer.id,
                name: customer.name,
                email: customer.email,
                paymentID: intent.id,
                address: customer.address,
                cart
            })
            await order.save()
            Checkout = intents ;
            status = "success";
        } catch (error) {
            console.error("Error:", error);
            status = "failure";
        }
        res.json({error, status, Checkout});

    }
}


module.exports = paymentCtrl
*/