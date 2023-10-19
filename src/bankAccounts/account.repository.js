const prisma = require('../../db')

async function createUserAcc(user_id, reqBody){
    let { bank_name, bank_account_number, balance } = reqBody
    const balanceInt = Number(balance)
    const acc = prisma.bank_accounts.create({
        data: {
            bank_name,
            bank_account_number,
            balance: balanceInt,
            user: {
                connect: {
                    id: user_id
                }
            }
        }
    })
    return acc
}

async function findBankAccNumber(reqBody){
    const { bank_account_number } = reqBody
    const result = await prisma.bank_accounts.findFirst({
        where: {
            bank_account_number
        }
    })
    return result
}

async function findBankAccById(accId ){
    const result = await prisma.bank_accounts.findUnique({
        where:{
            id: accId,
        },    
    });
    return result;
}

async function findAccounts() {
    return await prisma.bank_accounts.findMany()
}

async function deleteAccount(id, user_id, bank_account_number) {
    const acc = await prisma.bank_accounts.delete({
        where:{
         id: id,
         AND:[
            { bank_account_number: { contains: bank_account_number, }, },
            { user_id: user_id, },
         ]
        }
    });
    return acc;
}
module.exports = {
    createUserAcc,
    findBankAccNumber,
    findBankAccById,
    findAccounts,
    deleteAccount,
}