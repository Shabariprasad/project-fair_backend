//import userSchema
const users = require('../Models/userSchema')

//imort jsonwebtoken
const jwt = require('jsonwebtoken')

//register logic
exports.register=async(req,res)=>{
    console.log("Inside register function");
    const {username,email,password} =req.body
    try{
        //if checking the user is already registered in DB
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(401).json("user already registered")
    }
    else{
        //if the email is not present in DB - new user data will save to the DB
        const newUser = await users({
            username,email,password,github:"",link:"",profile:""
        })
        await newUser.save()//save new user to DB
        res.status(200).json("user registration sucessfull")
    }
    }
    catch(err){
        res.status(500).json("server error:"+ err.msg)
    }
    
    console.log(`${username} ${email} ${password}`);

}

//login logic
exports.login=async(req,res)=>{
    console.log("inside login function");
    const{email,password}=req.body
    try {
        const user = await users.findOne({email,password})
        if (user) {
            //token generation 
            const token = jwt.sign({userId:user._id},"superket2024")
            console.log(token);
            res.status(200).json({user,token})//response
        } 
        else{
            res.status(401).json("invalid login")
        }
    } catch (err) {
        res.status(500).json("server error:"+err.message)
    }
}
