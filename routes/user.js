const express = require('express');
const User = require('../models/user')
const router = express.Router();

router.get("/signin", (req,res)=>{
    res.render("signin")
})

router.get("/signup", (req,res)=>{
    res.render("signup")
})

router.post("/signup", async(req,res)=>{
    const {firstname, email , password}= req.body;
     await User.create({
        firstname ,
        email,
        password,
    })
    return res.redirect("/");
})

router.post("/signin", async (req,res)=>{
    const {email , password} = req.body;
    User.matchPassword(email, password).then((user)=>{
        if(!user) return res.send("Invalid Credentials");
        return res.send("Login Successfull");
    }).catch((err)=>{
        console.log("Error in signin", err);
        return res.send("Something went wrong");
    })  
})

module.exports = router;