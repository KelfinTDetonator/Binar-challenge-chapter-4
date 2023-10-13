const express = require('express')
const router = express.Router();

const accService = require('./account.service')

router.post('/', async(req, res)=>{
    try {
        const accounts = await accService.createAccount(req.body)
        res.status(201).json(accounts)
    } catch (error) {
        res.status(400).send(error.code)
    }
})

router.get('/', async(req, res)=>{
    try {
        const accounts = await accService.getAccounts();
        res.status(200).json(accounts)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:id', async(req, res)=>{
    try {
        let accId = +req.params.id
        const account = await accService.getAccountById(accId)
            if(account){
                res.status(200).json(account)
            }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router
