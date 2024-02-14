// loads .env file into process.env
require('dotenv').config()//Loads .env file contents inti process .env by default

// import express
const express = require('express');

//import cors
const cors = require('cors');

//import connection string
const db = require('./DB/connection')

//import route
const router = require('./Router/route')

//import middleware
const appMiddleware = require('./Middlewares/appmiddleware');
const jwtMiddleware = require('./Middlewares/jwtMiddleware');

//create a backend application using express
const pfServer = express()

//use
pfServer.use(cors())
pfServer.use(express.json())// Returns middleware that only parses json
pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads')) //to export image from server to client 

//port creation
const PORT = 4000 || process.env.PORT

//server listen
pfServer.listen(PORT,()=>{
    console.log(`listening on port`+PORT);
})

//http - get resolving to http://localhost4000
pfServer.get("/",(req,res)=>{
    res.send(`<h1>project-fair started</h1>`)
})