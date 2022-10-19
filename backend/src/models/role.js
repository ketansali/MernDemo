const mongoose = require('mongoose')
const roleSchema = new mongoose.Schema({
    _id : {
        type : Number,
        required : true,
    },
    title : {
        type : String,
        required : true,
        trim : true
    },
   
},{timestamps:true})
module.exports = mongoose.model('role',roleSchema)