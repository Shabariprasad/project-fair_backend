const mongoose = require('mongoose')

//project scheme creation
const projectScheme = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    projectImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

//model creation (collection in mongodb)
const projects = mongoose.model("projects",projectScheme)

//export project
module.exports = projects