const JWT = require('jsonwebtoken');


const secret = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";

function  createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImgURL:user.profileImgURL,
        role:user.role,
    };

    const token = JWT.sign(payload, secret);
    return token;
}

function verifyToken(token){
    const payload = JWT.verify(token , secret);
return payload;
}

module.exports={
    createTokenForUser,
    verifyToken
}