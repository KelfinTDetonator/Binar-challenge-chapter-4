const accRepos = require('./account.repository');
const userRepos = require('../users/user.repository');

const convertToInt = (prop) => parseInt(prop.balance)

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
    if(typeof accId !== 'number'){
        throw Error('Account ID must be a number')
    }

    const account = await accRepos.findBankAccById(accId)
    if(!account){
        throw Error("Account not found")
    }
    account.balance = convertToInt(account)
    return account;
}

const getAccounts = async() => {
    const accounts = await accRepos.findAccounts();

    for (const iterator of accounts) {
        iterator.balance = convertToInt(iterator)
        accounts.balance = iterator.balance //input balik ke tiap object accounts
    };
    
    return accounts
}

module.exports = {
    createAccount,
    getAccountById,
    getAccounts,
}