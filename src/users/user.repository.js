const prisma = require('../../db')

async function findUsers() {
    const users = prisma.users.findMany();
    return users;
}

async function findUserById(id) {
    const user = prisma.users.findUnique({
        where: {
            id,
        }
    });
    return user;
}

async function findUserByEmail(email) {
    const user = prisma.users.findFirst({
        where: {
            email,
        }
    });
    return user;
}

async function createUser(reqBody) {
    const { name, email, password, identity_type, identity_number, address } = reqBody;
    const userCreated = await prisma.users.create({
        data: {
            name,
            email,
            password,
            profile: {
                create: {
                    identity_type,
                    identity_number,
                    address,
                }
            }
        },
        include: {
            profile: {
                select: {
                    id: true,
                    identity_number: true,
                    identity_type: true,
                    address: true
                }
            }
        }
    });
    return userCreated;
}

async function updateUser(id, reqBody){
    const { name, email, password, identity_type, identity_number, address } = reqBody;
    const userUpdate = await prisma.users.update({
        where:{
            id: id,
        },
        data:{
            name, email, password, identity_type, identity_number, address
        }
    })
    return userUpdate
}

module.exports = {
    findUsers,
    findUserById,
    findUserByEmail,
    createUser,
    updateUser,
}