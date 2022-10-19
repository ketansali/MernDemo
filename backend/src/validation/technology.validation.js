const Joi = require('joi')
exports.techValidation = (req,res,next)=>{
    const techSchema = Joi.object({
        title : Joi.string().required(),
    })
    const {error} = techSchema.validate(req.body)
    if(!error) return next()
    const message = error.details.map(e=>e.message)
   return res.status(400).json({error:message})
}