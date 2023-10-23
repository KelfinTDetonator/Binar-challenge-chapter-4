const accService = require('./account.service')

async function createAccount(req, res){
    try {
        const account = await accService.createAccount(req.body)
        res.status(201).json({
            data: account,
            message: "Account created successfully"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function getAllAccounts(req, res){
    try {
        const accounts = await accService.getAccounts();
        res.status(200).json(accounts)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getAccountById(req, res){
    try {
        let accId = +req.params.id;
        if(typeof accId !== 'number'){
            throw Error('Account ID must be a number')
        }
        const account = await accService.getAccountById(accId)
            if(account){
                res.status(200).json({
                    data: account,
                    message: "Fetch account data success"
                })
            }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function deleteAccountById(req, res){
    try {
        const accId = +req.params.id;
        let {bank_account_number, user_id} = req.body;
        parseInt(user_id)
        if(typeof user_id !== 'number'){
            throw Error('Account ID must be a number')
        }
        await accService.deleteAccount(accId, user_id, bank_account_number);
        
        res.status(200).json({
            message: "Account deleted"
        })
    } catch (err) {   
        if(err.statusCode){
            res.status(err.statusCode).send(err.message);
            return;
        }
        res.status(400).send(err.message);   
    }
}

module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    deleteAccountById,
}
