const prisma = require('../../db')

const tranRepos = require('../transactions/transaction.repository')

async function createTransaction(sender, recipient, amountInt){
    if(typeof sender.id !== 'number' && typeof recipient.id !== 'number'){
        throw Error ("ID must be a number")
    }

    if(sender.balance < amountInt){
        throw Error("Your money balance is not enough to make a transaction")
    }

    const transaction = await tranRepos.createTransaction(sender, recipient, amountInt)
    transaction.amount = parseInt(transaction.amount)
    return transaction
}

async function getAllTransactions(){
    const transactions = await tranRepos.findAllTransactions();
    return transactions
}

module.exports = {
    createTransaction,
    getAllTransactions
}