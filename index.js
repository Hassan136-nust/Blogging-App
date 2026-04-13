
const express  = require ("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogging-app").then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Error connecting to DB", err);
})

app.use(express.urlencoded({extended:true}));

const userRoute = require("./routes/user")

const PORT=3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req,res)=>{
    res.render("index");
})

app.use("/user",userRoute)

app.listen(PORT)