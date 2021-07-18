const express = require('express');
//const PaymentModel = require('../models/paymentModel');
const stripe = require('stripe')('sk_test_51ImeGQSJnujPryRaIZ4vPJhc1sgHpyq5BDTOxtcwZlFjomQqIdCNqXlVvlghs6dfcSRil1lqzYSZ5G52GT7y9GLC00IWGgecSF')
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { line_items, customer_email } = req.body
  let session;
  try {
     session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      customer_email,
      mode: 'payment',
      success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/canceled',
      shipping_address_collection: { allowed_countries: ['IN']},
    });
    
    //console.log({session})
    res.send({session});
  } catch (error) {
    console.log(error);
    res.status(400).json({error: 'an error occured'})
  }

});
router.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});


module.exports = router

/*const newPayment = new PaymentModel({
  user_id:user._id,
  name: user.name,
  email: user.email,
  paymentID: session.payment_intent,
  address: address,
  contact: mobile,
  cart,
  amount: session.amount_total / 100 ,
  zipCode,
  paid: 'true',
  method: 'card'
})
await newPayment.save()*/