const express = require('express')
const router = express.Router();

const userService = require('./user.service');
const checkToken = require('../middleware/checkToken');

//get all users info
router.get('/', async(req, res)=>{
    const users = await userService.getUsers();
    res.status(200).json(users)
})


//TODO: #############
//register user
router.post('/auth/register', async(req, res)=>{
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
})

//TODO: #############
//login user, return token
router.post('/auth/login', async(req, res)=>{
    try {
        const loggedIn = await userService.loginUser(req.body)
        console.log(loggedIn)
        res.status(200).json({
            data: loggedIn
        })
    } catch (err) {
        res.status(403).send( err.stack )
      
    }
})

//user authenticated
router.get('/auth/authenticate', checkToken, async(req, res)=>{
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
})

//update user, profile by id
router.put('/:id', async(req, res)=>{
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
})

//patch user and profile by id
router.patch('/:id', async(req, res)=>{
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
})

//delete user, and profile by id
router.delete('/:id', async(req, res)=>{
    try {
        const userId = +req.params.id;
        await userService.deleteUserById(userId)
        res.status(200).send({
            message: "User & Profile has deleted"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;