const express = require("express");
const stripe = require("stripe")
("sk_test_51ImeGQSJnujPryRaIZ4vPJhc1sgHpyq5BDTOxtcwZlFjomQqIdCNqXlVvlghs6dfcSRil1lqzYSZ5G52GT7y9GLC00IWGgecSF")
const uuid = require('uuid').v4
const router = express.Router();

router.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const {total, token } = req.body;

        const customer = await
        stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuid();
        const charge = await stripe.charges.create({
            amount: total * 100,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase the ${token.card.name}`,
            shipping: {
                name: token.card.name,
               address: {
                   line1: token.card.address_line1,
                   line2: token.card.address_line2,
                   city: token.card.address_city,
                   country: token.card.address_country,
                   postal_code: token.card.address_zip,
               } 
            }

        },{
            idempotency_key
        });
        console.log("charge:", {charge});
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }

    res.json({error, status});
});

module.exports = router