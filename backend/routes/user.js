const express = require('express');
const userController = require('../controller/userController');
const handleErrorMessage = require('../helper/handleErrorMessage');
const AuthMiddleware = require('../helper/AuthMiddleware');
const router = express.Router()

router.get('/me',AuthMiddleware,userController.me)
router.post('/register',handleErrorMessage,userController.register)
router.post('/login',userController.login)
router.post('/logout',userController.logout)

module.exports = router;