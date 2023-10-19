const accRepos = require('./account.repository');
const userRepos = require('../users/user.repository');

const convertToInt = (prop) => parseInt(prop.balance);

class CustomError extends Error {
    constructor(message, statusCode) {
     super(message)
     this.statusCode = statusCode
    }
}
async function createAccount(reqBody) {
    let { user_id } = reqBody;
    user_id = parseInt(user_id);

    if (typeof user_id !== 'number') {
        throw Error("User_id must be a number");
    }

    const user = await userRepos.findUserById(user_id);
    if (!user) {
        throw new Error("User not exist");
    }

    if (await accRepos.findBankAccNumber(reqBody)) {
        throw new Error("Account number should be unique");
    }

    const acc = await accRepos.createUserAcc(user_id, reqBody);
    acc.balance = convertToInt(acc) //
    return acc;
}

async function getAccountById(accId){
    const account = await accRepos.findBankAccById(accId)
    if(!account){
        throw new CustomError("Account not found", 404)
    }
    account.balance = convertToInt(account)
    return account;
}

async function getAccounts() {
    const accounts = await accRepos.findAccounts();

    for (const iterator of accounts) {
        iterator.balance = convertToInt(iterator);
        accounts.balance = iterator.balance; //input balik ke tiap object accounts
    };

    return accounts;
}

async function deleteAccount(id, user_id, bank_account_number){
    const user = await getAccountById(parseInt(user_id));
    const deleteAcc = await accRepos.deleteAccount(id , user_id, bank_account_number);
    if(!deleteAcc){
        throw new CustomError("Internal server error", 500);
    }
    return deleteAcc;
}
module.exports = {
    createAccount,
    getAccountById,
    getAccounts,
    deleteAccount
}