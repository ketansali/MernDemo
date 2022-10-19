const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const userSchema = new mongoose.Schema({
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
    password : {
        type : String,
        select: false,
        required : true,
        trim : true    
    },
    role : {
        type : Number,
        default : 2,
        ref : 'role'
    }
},{timestamps:true})

userSchema.pre('save',async function(){
    if(!this.isModified('password')) return next()
    this.password  = await bcrypt.hash(this.password,10)
})
userSchema.methods = {
    authenticated  : async function(pass){
        return await bcrypt.compare(pass,this.password)
    }
}
module.exports = mongoose.model('users',userSchema)