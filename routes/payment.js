const express = require("express");
const stripe = require('stripe')("sk_test_51ImeGQSJnujPryRaIZ4vPJhc1sgHpyq5BDTOxtcwZlFjomQqIdCNqXlVvlghs6dfcSRil1lqzYSZ5G52GT7y9GLC00IWGgecSF")
const uuid = require('uuid').v4
const router = express.Router();
const PaymentModel = require('../models/paymentModel')
const Users = require('../models/userModel')
const nodemailer = require("nodemailer");



router.get("/checkout", async(req, res) => {
    try {
        const  paymentModel = await PaymentModel.find()
        res.json(paymentModel)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})


router.post("/checkout_success", async (req, res) => {
    const {id, cart, user, total} =req.body

    try {
        const order = new PaymentModel({
            user_id:user._id,
            name: user.name,
            email: user.email,
            paymentID:id,
            address: user.address,
            zipCode:user.postalCode,
            contact:user.mobile,
            cart,
            amount: total,
            paid: 'true',
            method: 'card'
    
        })
            await order.save()
            

        //const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
              user: 'Elegnate@outlook.com', // genthereal.emaierated ethereal user
              pass: 'Ash16arysu&sa', // generated ethereal password
            },
          });

          const message = {
            from: 'Elegnate@outlook.com', // sender address
            to: "ashishvaidya683@gmail.com", // list of receivers
            subject: "Your Order is Confirmed!", // Subject line
            text: `Hey ${user.name}
                    Thank you for your Order
                    Order:${order._id} 
                    Tour Order Will be placed within 6 days!!
                                        Total:${total}`, // plain text body
          };

          transporter.sendMail(message, (err, info) => {
              if(err){
                  console.log("error in sending mail",err)
                  return res.status(400).json({
                      message: `error in sending mail ${err}`
                  })
              }else{
                  console.log("successfully send the mail", info)
                  return res.json({
                      message: info
                  })
              }
          })
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: err.message})
    }
})

router.post("/payment_card", async (req, res) => {
    let {amount, id} = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "INR",
            payment_method: id,
            confirm: true
        })
        //console.log("Payment", payment)
        res.json({
            message: "Payment Successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
})

router.post("/cashcheckout", async (req, res) => {
    let error;
    let status;
    try {
        const {total, cart} = req.body
        const {address, postalCode, mobile,_id, name, email} = req.body.user

        const user = await Users.findById(req.body.user._id).select('name email')
        if(!user) return res.status(400).json({msg: "User does not exist."})

        const order = new PaymentModel({
            user_id: _id, name, email, cart, address, zipCode:postalCode,
            contact:mobile, amount: total, paid:'false', method: 'cash'
        })
        //console.log(newPayment)
        await order.save()
        status = "success";

        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
              user: 'Elegnate@outlook.com', // genthereal.emaierated ethereal user
              pass: 'Ash16arysu&sa', // generated ethereal password
            },
          });

          const message = {
            from: 'Elegnate@outlook.com', // sender address
            to: "ashishvaidya683@gmail.com", // list of receivers
            subject: "Your Order is Confirmed!", // Subject line
            text: `Hey ${user.name}
                    Thank you for your Order
                    Order:${order._id} 
                    Tour Order Will be placed within 6 days!!
                                        Total:${total}`, // plain text body
          };

          transporter.sendMail(message, (err, info) => {
              if(err){
                  console.log("error in sending mail",err)
                  return res.status(400).json({
                      message: `error in sending mail ${err}`
                  })
              }else{
                  console.log("successfully send the mail", info)
                  return res.json({
                      message: info
                  })
              }
          })



    
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

/*router.post("/checkout", async (req, res) => {

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
*/
