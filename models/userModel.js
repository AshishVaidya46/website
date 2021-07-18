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
    contact: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Array,
        require:true,
        default:[]
    },
    postalCode: {
        type: Array,
        require: true,
        default:[]
    },
    mobile: {
        type:Array,
        require: true,
        default:[]
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)