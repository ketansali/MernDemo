const mongoose = require('mongoose')
const USER = process.env.USER
const PASS = process.env.PASS
const DB = process.env.DB
require('../models/role')
mongoose.connect(`mongodb+srv://${USER}:${PASS}@cluster0.jc8ks.mongodb.net/${DB}?retryWrites=true&w=majority`)
.then(()=>{
    console.log('DataBase Connected');
})
.catch((err)=>{
    console.log(err);
})