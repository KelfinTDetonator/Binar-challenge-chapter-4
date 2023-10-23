const express = require('express')
const router = express.Router();
const transactionController = require('../transactions/transactionController')

router.post('/', transactionController.createTransaction)
router.get('/', transactionController.getAllTransactions)
router.get('/:transactionId', transactionController.getTransactionById)
router.delete('/:transactionId', transactionController.deleteTransactionById)

module.exports = router
