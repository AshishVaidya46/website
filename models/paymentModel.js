const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    paymentID:{
        type: String,
    },
    address:{
        type: Object,
        required: true
    },
    zipCode: {
        type: Number
    },
    contact:{
        type: String,
        required:true 
    },
    cart:{
        type: Array,
        default: []
    },
    amount:{
        type:String,
        required: true
    },
    delivered: {
        type: Boolean,
        default: false
    },
    paid: {
        type: String,
        require:true 
    },
    method:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Payments", paymentSchema)