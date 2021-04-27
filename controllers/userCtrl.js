const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')


const userCtrl = {
    register: async (req, res) =>{
        try {
            const {name, email, password, address, city, state, zip} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "The email already exits."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password is at least 6 characters long"})
    

            // Password Encryption    
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash, address, city, state, zip
                        })

            //save mongodb
            await newUser.save() 

            //Then create jsonwebtoken to authentication
            const accestoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 //7d
            })

            res.json({accestoken})   

        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg:"User does not exits."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg:"Incorrect Password."})

            //if login success, create access token and refresh token
            const accestoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 //7d
            })

            res.json({accestoken })   
                } catch (err) {        
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken',{path: '/user/refresh_token'})
            return res.json({msg:"Logged Out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "please Login or Register"})
              
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})
                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },
    getUser: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exits."})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})

        }
    },
    addCart: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not esit"})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET , {expiresIn: '11m'})
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl