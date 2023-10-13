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
            const user = (sender) ? "Destination account" : "Source account";
            res.status(404).send(`${user} not found!`)
        }
        sender.id = parseInt(senderId)
        recipient.id = parseInt(recipientId)

        const transaction = await tranService.createTransaction(sender, recipient, amountInt)
        res.status(200).json(transaction)

    } catch (error) {
        res.status(400).send(error.stack)
    }
})

router.get('/', async(req, res)=>{
    try {
        const transactions = await tranService.getAllTransactions()
        
        for (const transaction of transactions) {
            if(typeof transaction.amount === 'bigint'){
                transaction.amount = parseInt(transaction.amount)
                transactions.amount = transaction.amount
            }
        }
        
        res.status(200).json(transactions)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router