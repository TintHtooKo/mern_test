const User = require('../models/User')
const createToken = require('../helper/createToken')
const userController = {
    register : async(req,res) =>{
        try {
            let {username,email,password} = req.body
            let user = await User.register(username,email,password)
            let token = createToken(user._id)
            res.cookie('jwt',token,{httpOnly : true, maxAge : 3 * 60 * 60 * 24 * 1000})
            return res.json({user,token})
        } catch (error) {
            return res.status(400).json({error:error.message})
        }
    },
    login : async(req,res) =>{
        try {
            let {email,password} = req.body
            let user = await User.login(email,password)
            let token = createToken(user._id)
            res.cookie('jwt',token,{httpOnly : true, maxAge : 3 * 60 * 60 * 24 * 1000})
            return res.json({user,token})
        } catch (error) {
            return res.status(400).json({error:error.message})
        }
    },
    logout : async(req,res) =>{
        res.cookie('jwt','',{maxAge : 1})
        return res.json({msg:"Logout"})
    },
    me : async(req,res) =>{
        return res.json(req.user)
    }
}

module.exports = userController;