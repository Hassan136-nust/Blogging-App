
const express  = require ("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

// Load environment variables
require('dotenv').config();

const {checkForAuthenticationCookie} = require("./middlewares/authentication"); 

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blogging-app";

mongoose.connect(MONGODB_URI).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Error connecting to DB", err);
})

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(checkForAuthenticationCookie("token"));

const PORT = process.env.PORT || 10000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req,res)=>{
    if(!req.user) return res.redirect("/user/signin");
    res.redirect("/blogs");
    
})

app.use("/user",userRoute)
app.use("/blogs", blogRoute)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})