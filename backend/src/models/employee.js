const mongoose = require('mongoose')
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const employeeSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        validate: [validateEmail, 'Please fill a valid email address'],
        lowercase : true,
        unique : true
    },
    designation : {
        type : String,
        required : true,
        trim : true
    },
    contact : {
        type : Number,
        required : true,
        trim : true
    },
    gender : {
        type : String,
        required : true,
        trim : true
    },
    technology :[ {
        type : mongoose.Schema.Types.ObjectId,
        trim : true,
        ref : 'technology',
        required : true
    }],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        trim : true,
        ref : 'users'
    },
    updatedBy : {
        type : mongoose.Schema.Types.ObjectId,
        trim : true,
        ref : 'users'
    },
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})


module.exports = mongoose.model('employees',employeeSchema)