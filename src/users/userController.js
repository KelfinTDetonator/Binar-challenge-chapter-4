const express = require('express')
const router = express.Router();

const userService = require('./user.service');
 
router.get('/', async(req, res)=>{
    const users = await userService.getUsers();
    res.status(200).json(users)
})

router.get('/:id', async(req, res)=>{
    try {
        const userId = +req.params.id
        if(typeof userId !== 'number'){
            throw Error("ID harus berupa angka!")
        }
        const user = await userService.getUserById(userId)

        res.status(200).json(user)

    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', async(req, res)=>{
    try {
        const user = await userService.registerUser(req.body);
        res.status(200).json(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

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
            message: "Product updated!"
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
})

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

module.exports = router;