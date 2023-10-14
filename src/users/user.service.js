const userRepos = require('./user.repository')

async function registerUser(reqBody){
    const email = await userRepos.findUserByEmail(reqBody.email);
    //validasi user yang sama
    if (email) {
        throw Error("user is exist, check your account");
    }
    //if not exist, then
    const user = await userRepos.createUser(reqBody);
    return user;
}

async function getUsers(){
    const users = await userRepos.findUsers();
    return users;
}

async function getUserById(id){
    const user = await userRepos.findUserById(id);
    if (!user) {
        throw Error("user tidak ditemukan");
    }
    return user;
}

async function updateUserById(id, reqBody){
    const user = await userRepos.findUserById(id);
    if (!user) {
        throw Error("user tidak ditemukan");
    }
    
    return await userRepos.updateUser(id, reqBody)
}


module.exports = {
    registerUser,
    getUsers,
    getUserById,
    registerUser,
    updateUserById
}