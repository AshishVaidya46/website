const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required:true
    },
    state: {
        type:String,
        required:true
    },
    zip: {
        type:Number,
        required:true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    }
 }, {
        timestamps: true
   
 })

module.exports = mongoose.model('Users', userSchema)