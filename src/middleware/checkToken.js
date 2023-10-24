const jwt = require('jsonwebtoken');
require('dotenv').config()

const checkToken = (req, res, next) =>{
    let authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] 
    // console.log(token)
    if(!token){
        return res.status(401).json({
            error: 'Please provide a token'
        })
    }

    const jwtPayLoad = jwt.verify(token, process.env.SECRET_KEY || 'secret_key')

    if(!jwtPayLoad){
        return res.status(403).json({
            error: "unauthenticated"
        })
    }
    res.user = jwtPayLoad
    next()
}

module.exports = checkToken