const { json } = require('express');
const userRepos = require('./user.repository');


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
        throw Error("user is exist, check your account");
    }
    //if not exist, then
    const user = await userRepos.createUser(reqBody);
    return user;
}

async function getUsers(){
    const users = await userRepos.findUsers();
    return users;
}

async function getUserById(id){
    const user = await userRepos.findUserById(id);
    if (!user) {
        throw new CustomError('User tidak ditemukan', 404)
    }
    return user;
}

async function updateUserById(id, reqBody){
    await getUserById(id) //check if user exist
    
    return await userRepos.updateUser(id, reqBody)
}

async function loginUser(reqBody){
    const {email, password} = reqBody
    const findUser = userRepos.findUserByEmail(email)
    if(!findUser){
        return 
    }
}

module.exports = {
    registerUser,
    getUsers,
    getUserById,
    registerUser,
    updateUserById,
    loginUser
}