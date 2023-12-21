const { json } = require('express');
const userRepos = require('./user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const genHashCrypt = async(password)=>{
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
}

class CustomError extends Error {
    constructor(message, statusCode) {
     super(message)
     this.statusCode = statusCode
    }
}

async function registerUser(reqBody){
    const email = await userRepos.findUserByEmail(reqBody.email);
    //validasi user yang sama
    if (email) {
        throw new CustomError("user is exist, login with your account instead", 409);
    }
    //if not exist, then
    reqBody.password = await genHashCrypt(reqBody.password);
    const user = await userRepos.createUser(reqBody);
    return user;
}

async function loginUser(reqBody){
    const {email, password} = reqBody
    const user = await userRepos.findUserByEmail(email)
    // console.log( user, password)
    if(!user){
        throw new CustomError("Email or password may be incorrect", 401)
    }
    if(bcrypt.compareSync(password, user.password)){
                                            //if key exist in env     //if not exist
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'secret_key', { expiresIn: '6h'});
        return token;
    } else{
        throw new CustomError({ error: "Invalid credential" }, 403)
    }
   
}
async function getUsers(){
    const users = await userRepos.findUsers();
    if(!users){
        throw new CustomError('Internal Server Error', 500)
    }
    return users
}

async function getUserById(id){
    const user = await userRepos.findUserById(id);
    if (!user) {
        throw new CustomError('User not found', 404)
    }
    return user;
}

async function updateUserById(id, reqBody){
    await getUserById(id) //check if user exist
    return await userRepos.updateUser(id, reqBody)
}

async function deleteUserById(id){
    await getUserById(id); //check if user exist
    const deleted = await userRepos.deleteUserProfile(id);
    return deleted
}

module.exports = {
    registerUser,
    getUsers,
    getUserById,
    registerUser,
    updateUserById,
    deleteUserById,
    loginUser,
}