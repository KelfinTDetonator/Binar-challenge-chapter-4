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

module.exports = router;