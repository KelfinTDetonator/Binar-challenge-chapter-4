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

async function findBankAccById(accId){
    const result = await prisma.bank_accounts.findUnique({
        where:{
            id: accId,
        },
    })
    
    return result
}

const findAccounts = async() => {
    return await prisma.bank_accounts.findMany();
}

module.exports = {
    createUserAcc,
    findBankAccNumber,
    findBankAccById,
    findAccounts,
}