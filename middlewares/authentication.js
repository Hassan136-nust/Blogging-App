const {verifyToken}= require('../services/authentication');
function checkForAuthenticationCookie(cookiename){
    return function(req, res , next){
        const tokenCookieValue = req.cookies[cookiename];
        if(!tokenCookieValue){
            req.user = null;
            return next();
        }

    try{
        const userPayload = verifyToken(tokenCookieValue);
        req.user = userPayload;
        next();
    }
    catch(error){
        req.user = null;
        next();
    }
}}

function ensureAuthenticated(req, res, next) {
    if (!req.user) {
        return res.redirect('/user/signin');
    }
    next();
}

module.exports={
    checkForAuthenticationCookie,
    ensureAuthenticated,
}