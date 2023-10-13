const express = require('express');
const router = express.Router();
const accRepos = require('../bankAccounts/account.repository')
const tranService = require('./transaction.service')

router.post('/', async(req, res)=>{
    try {
        const {source_account_id, destination_account_id, amount } = req.body;
        const senderId = parseInt(source_account_id), recipientId = parseInt(destination_account_id);
        const amountInt = parseInt(amount)

        const sender = await accRepos.findBankAccById(senderId)
        const recipient = await accRepos.findBankAccById(recipientId)
        
        if(!(sender && recipient)){
            res.status(404).send(`${sender || recipient} not found!`)
        }
        sender.id = parseInt(senderId)
        recipient.id = parseInt(recipientId)

        const transaction = await tranService.createTransaction(sender, recipient, amountInt)
        res.status(200).json(transaction)

    } catch (error) {
        res.status(400).send(error.stack)
    }
})

module.exports = router