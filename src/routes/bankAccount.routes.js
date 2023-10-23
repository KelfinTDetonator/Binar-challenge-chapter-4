const express = require('express')
const router = express.Router();
const accController = require('../bankAccounts/accountController')

router.post('/', accController.createAccount);
router.get('/', accController.getAllAccounts);
router.get('/:id', accController.getAccountById);
router.delete('/:id', accController.deleteAccountById);

module.exports = router