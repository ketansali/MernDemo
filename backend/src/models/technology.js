const mongoose = require('mongoose')
const techSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
   
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})
techSchema.index({title:"text"})
// techSchema.virtual('techno',{
//    ref:'employees',
//    localField:'title',
//    foreignField:'technology.title'
// })
module.exports = mongoose.model('technology',techSchema)