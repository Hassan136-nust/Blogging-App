const express = require('express');
const User = require('../models/user')
const router = express.Router();

const {createTokenForUser} = require('../services/authentication');
const cookie = require('cookie-parser');
router.use(cookie());

router.get("/signin", (req,res)=>{
    res.render("signin", { user: req.user })
})

router.get("/signup", (req,res)=>{
    res.render("signup", { user: req.user })
})

router.post("/signup", async(req,res)=>{
    try {
        const {firstname, email , password}= req.body;
        
        if (!firstname || !email || !password) {
            return res.status(400).send('All fields are required');
        }

        await User.create({
            firstname ,
            email,
            password,
        })
        return res.redirect("/");
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000) {
            return res.status(400).send('Email already exists');
        }
        return res.status(500).send('Error creating user');
    }
})

router.post("/signin", async (req,res)=>{
    try {
        const {email , password} = req.body;
        
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        const token = await User.matchPassword(email, password);
        if (!token) {
            return res.redirect("/user/signin");
        }
        return  res.cookie("token", token ).redirect("/");
    } catch (error) {
        console.error('Error signing in:', error);
        return res.redirect("/user/signin");
    }
})

router.get("/logout", (req,res)=>{
    res.clearCookie("token").redirect("/user/signin");
})

module.exports = router;