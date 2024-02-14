const mongoose = require('mongoose')

//creating schema
const userScheme = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    github:{
        type:String,
    },
    link:{
        type:String,
    },
    profile:{
        type:String,
    }
})

//creating model
const users = mongoose.model("users",userScheme)
module.exports=users
