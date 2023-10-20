const prisma = require('../../db')

const jwt = require('jsonwebtoken')

// const cryptPassword = async(password)=>{
//     const salt = await bcrypt.genSalt(5);

//     return bcrypt.hash(password, salt)
// }

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
            email: {
                contains: email
            },
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
            name, email, password, 
            profile:{
                update:{
                    where:{
                        user_id: id,
                    },
                    data:{
                        identity_type, 
                        identity_number, 
                        address
                    },
                },
            },
        },
        include:{
            profile: true
        }
    })
    return userUpdate
}

// const loginUser = async(reqBody) => {
//     const {email, password} = reqBody
//     const user = await findUserByEmail(email)

    
// }

async function deleteUserProfile(id){
    const deleteProfile = await prisma.profiles.delete({
        where:{
            id,
        }
    })
    const deleteUser = await prisma.users.delete({
        where:{
            id,
        }
    })
    return await prisma.$transaction([deleteProfile, deleteUser])
}


module.exports = {
    findUsers,
    findUserById,
    findUserByEmail,
    createUser,
    updateUser,
    deleteUserProfile,
    // loginUser,
}