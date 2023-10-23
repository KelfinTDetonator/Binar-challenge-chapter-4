const express = require('express')
const router = express.Router();

const userController = require('../users/userController');
const checkToken = require('../middleware/checkToken');

router.get('/', userController.getAllUsers)
router.post('/auth/register', userController.registerUser)
router.post('/auth/login', userController.loginUser)
router.get('/auth/authenticate', checkToken, userController.userAuthenticated)
router.put('/:id', userController.updateUserById)
router.patch('/:id', userController.patchUserById)
router.delete('/:id', userController.deleteUserById)

module.exports = router