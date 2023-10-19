const tranRepos = require('../transactions/transaction.repository');

class CustomError extends Error {
    constructor(message, statusCode) {
     super(message)
     this.statusCode = statusCode
    }
}

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

async function getTransactionById(id){
    const transaction = await tranRepos.findTransactionById(id);
    if(!transaction){
        throw new CustomError("Transaction not exist", 404);
    }
    return transaction
}

async function deleteTransactionById(id){
    await getTransactionById(id) //check if transaction is exist
    return await tranRepos.deleteTransactionById(id);
}

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    deleteTransactionById,
}