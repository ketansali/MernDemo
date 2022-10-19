const Joi = require('joi')

exports.employeeValidation = (req,res,next)=>{
    const empSchema = Joi.object({
        firstName : Joi.string().min(3).max(30).required(),
        lastName : Joi.string().min(3).max(30).required(),
        email : Joi.string().email().min(5).max(50).required(),
        designation : Joi.string().max(15).required(),
        gender : Joi.string().required(),
        technology : Joi.array().required(),
        contact : Joi.string().max(15).pattern(/^[0-9]+$/).required(),


    })
    const {error} = empSchema.validate(req.body)
    if(!error) return next()
    const message = error.details.map(e=>e.message)
   return res.status(400).json({error:message})
}

exports.signinValidation = (req,res,next)=>{
    const userSchema = Joi.object({
        email : Joi.string().email().min(5).max(50).required(),
        password : Joi.string().min(4).max(8).required(),
    })
    const {error} = userSchema.validate(req.body)
    if(!error) return next()
    const message = error.details.map(e=>e.message)
   return res.status(400).json({error:message})
}