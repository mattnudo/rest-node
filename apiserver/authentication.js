const jwt = require('jsonwebtoken')
require('dotenv').config()

// Never do this!
let users = {
    matt:  "mattrocks",
}

exports.login = function(req, res){

    let username = req.body.username
    let password = req.body.password

    console.log(`un:${username} pw:${password}`);

    // Neither do this!
    if (!username || !password || users[username] !== password){
        return res.status(401).send()
    }

    //use the payload to store information about the user such as username, user role, etc.
    let payload = {username: username}

    //create the access token with the shorter lifespan
    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: 120
    })

    //create the refresh token with the longer lifespan
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: 120
    })

    //store the refresh token in the user array
    users[username].refreshToken = refreshToken

    //send the access token to the client inside a cookie
    res.cookie("jwt", accessToken, { httpOnly: true})//secure: true,
    res.send()

}

exports.refresh = function (req, res){

    let accessToken = req.cookies.jwt

    console.log(`token:${accessToken} `);

    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        console.log(`access secret:${process.env.ACCESS_TOKEN_SECRET} `);
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
     }
    catch(e){
      console.log(`Could not verify access token`);
        return res.status(401).send()
    }

    //retrieve the refresh token from the users array
    let refreshToken = users[payload.username].refreshToken

    //verify the refresh token
    try{
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    }
    catch(e){
      console.log(`refreshToken:${refreshToken}`);
      console.log(`Could not verify refresh token`);
        return res.status(401).send()
    }

    let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,
    {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    res.cookie("jwt", newToken, {secure: true, httpOnly: true})
    res.send()
}
