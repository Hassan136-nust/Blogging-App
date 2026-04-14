const mongoose = require('mongoose');
const {createHmac , randomBytes} = require("crypto")
const {createTokenForUser} = require('../services/authentication');
const userSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        unique : true,
    },
    salt:{
        type : String,

    },
    password:{
        type : String,
        required : true,
    },
    profileImgURL:{
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        
    },
    role:{
        type : String,
        enum : ["Admin","User"],
        default : "User",
    },
}, {timestamps:true});

userSchema.pre("save" , function(){
    const user = this;
    if(!user.isModified("password")) return ;
    const salt = randomBytes(16).toString("hex");
    const hasehedPassword = createHmac("sha256", salt).update(user.password)
    .digest("hex");
    this.salt =salt;
    this.password = hasehedPassword;
    
})

userSchema.statics.matchPassword = async function(email, password) {
    const user = await this.findOne({ email });

    if (!user) return null;

    const salt = user.salt;

    const hashedPassword = createHmac("sha256", salt)
        .update(password)   // ✅ user entered password
        .digest("hex");

    if (hashedPassword !== user.password) {
        return null;
    }

    // remove sensitive data
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.salt;

    const token = createTokenForUser(userObj);
    return token;

};

const User = mongoose.model("User", userSchema);
module.exports = User;