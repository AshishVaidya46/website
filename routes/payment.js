const express = require("express");
const stripe = require('stripe')("sk_test_51ImeGQSJnujPryRaIZ4vPJhc1sgHpyq5BDTOxtcwZlFjomQqIdCNqXlVvlghs6dfcSRil1lqzYSZ5G52GT7y9GLC00IWGgecSF")
const uuid = require('uuid').v4
const router = express.Router();
const PaymentModel = require('../models/paymentModel')
const Users = require('../models/userModel')


router.get("/checkout", async(req, res) => {
    try {
        const  paymentModel = await PaymentModel.find()
        res.json(paymentModel)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})


router.post("/checkout", async (req, res) => {

    let Checkout;
    let error;
    let status;
    try {

        const { payments ,total, cart, mobile, userID} = req.body;

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
        
    const order = new PaymentModel({
        user_id:userID,
        name: customer.name,
        email: customer.email,
        paymentID: intents.id,
        address: customer.address,
        contact:mobile,
        cart,
        amount: total ,
        paid: 'true',
        method: 'card'

    })
        await order.save()
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }
    res.json({error, status});
});

router.post("/cashcheckout", async (req, res) => {
    let error;
    let status;
    try {
        const {total, cart, address, zipCode, mobile, userID} = req.body

        const user = await Users.findById(userID).select('name email')
        if(!user) return res.status(400).json({msg: "User does not exist."})

        const {_id, name, email} = user;

        const newPayment = new PaymentModel({
            user_id: _id, name, email, cart, address, zipCode,
            contact:mobile, amount: total, paid:'false', method: 'cash'
        })
        //console.log(newPayment)
        await newPayment.save()
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }
    res.json({error, status});

})

router.put("/checkout", async (req, res) => {
    try {
       const response = await PaymentModel.findOneAndUpdate({_id: req.body.id}, {delivered: true})
        res.json(response)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

router.put("/paidcheckout", async (req, res) => {
    try {
        const response = await PaymentModel.findOneAndUpdate({_id: req.body.id}, {paid: 'true'})
        res.json(response)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})
module.exports = router


/*const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/checkout')
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)


module.exports = router*/
