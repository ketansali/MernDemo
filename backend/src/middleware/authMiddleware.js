const jwt = require('jsonwebtoken')
const Users = require('../models/users')
exports.generateToken =  (_id)=>{
    return  jwt.sign({_id},process.env.JWTSECRET)
}

exports.authetication = (req,res,next)=>{
    try{
        let bearerToken = req.headers.authorization
        if(bearerToken && bearerToken.startsWith('Bearer')){
            const token = bearerToken.split(' ')[1]
            jwt.verify(token,process.env.JWTSECRET,async (error,user)=>{
                if(error) return res.status(401).json({
                    message : error.message
                })
                const userData = await Users.findById(user)
                req.user = userData
                next()
            })
        }else{
            return res.status(401).json({
                message : 'token not Provided'
            })
        }
        
    }catch (error) {
        throw new Error(error);
    }
}