const Joi = require('joi')

exports.signupValidation = (req,res,next)=>{
    const userSchema = Joi.object({
        firstName : Joi.string().min(3).max(30).required(),
        lastName : Joi.string().min(3).max(30).required(),
        email : Joi.string().email().min(5).max(50),
        password : Joi.string().min(4).max(8),


    })
    const {error} = userSchema.validate(req.body)
    if(!error) return next()
    const message = error.details.map(e=>e.message)
   return res.status(400).json({error:message})
}
exports.signinValidation = (req,res,next)=>{
    const userSchema = Joi.object({
        email : Joi.string().email().min(5).max(50),
        password : Joi.string().min(4).max(8),
    })
    const {error} = userSchema.validate(req.body)
    if(!error) return next()
    const message = error.details.map(e=>e.message)
   return res.status(400).json({error:message})
}