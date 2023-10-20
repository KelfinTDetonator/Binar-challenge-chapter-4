const jwt = require('jsonwebtoken');
require('dotenv').config()

const checkToken = (req, res, next) =>{
    let token = req.headers.authorization
    // console.log(token)
    if(!token){
        return res.status(403).json({
            error: 'Please provide a token'
        })
    }

    if(token.toLowerCase().startsWith('bearer')){
        token = token.slice('bearer'.length).trim()
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