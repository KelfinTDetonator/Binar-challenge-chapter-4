const express = require('express')
const router = express.Router();

const userService = require('./user.service');

//get all users info
async function getAllUsers(req, res){
    const users = await userService.getUsers();
    res.status(200).json(users);
}

//register user
async function registerUser(req, res){
    try {
        const user = await userService.registerUser(req.body);
        res.status(200).send({
            data: user,
            message: "User created successfully"
        })
        
    } catch (err) {
        if(err.statusCode){
            res.status(err.statusCode).send(err.message); return;
        }
        res.status(400).send(err.message)
    }
}

//login user, return token
async function loginUser(req, res){
    try {
        const loggedIn = await userService.loginUser(req.body)
        console.log(loggedIn)
        res.status(200).json({
            data: loggedIn
        })
    } catch (err) {
        res.status(403).send( err.message )
    }
}

//user authenticated
async function userAuthenticated(req, res){
    try {
        const userId = +res.user.id
        if(typeof userId !== 'number'){
            res.status(400).send("ID must be a number"); return;
        }
        const user = await userService.getUserById(userId)
        //excluding password
        delete user.password
        // const keys = "password"
        // Object.entries(user).filter(([key]) => !keys.includes(key))
        res.status(200).json({
            data: user,
            message: "Fetch user success"
        })

    } catch (error) {
        if(error.statusCode === 404){
            res.status(404).send(error.message)
        } else{
            res.status(400).send(error.message)
        }
        
    }
}

//update user, profile by id
async function updateUserById(req, res){
    try {
        const userId = +req.params.id
        const { name, email, password, identity_type, identity_number, address } = req.body;

        if(!(name, email, password, identity_type, identity_number, address)){
            res.status(400).send("Some fields are missing")
            return;
        }

        const updateUser = await userService.updateUserById(userId, req.body);
        res.send({
            data: updateUser,
            message: "User info updated!"
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
}

//patch user and profile by id
async function patchUserById(req, res){
    try {
        const userId = +req.params.id;
        const updateUser = await userService.updateUserById(userId, req.body);
        res.send({
            data: updateUser,
            message: "Product updated!"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

//delete user, and profile by id
async function deleteUserById(req, res){
    try {
        const userId = +req.params.id;
        await userService.deleteUserById(userId)
        res.status(200).send({
            message: "User & Profile has deleted"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getAllUsers, 
    registerUser,
    loginUser,
    userAuthenticated,
    updateUserById,
    patchUserById,
    deleteUserById,
};
