const jwt = require('jsonwebtoken')

exports.verify = function(req, res, next){
    let accessToken = req.cookies.jwt

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        console.log(`No token found`);
        return res.status(403).send()
    }

    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        next()
    }
    catch(e){
        console.log(`Token unverified`);
        //if an error occured return request unauthorized error
        return res.status(401).send()
    }
}
