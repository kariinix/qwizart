const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/check-user', authController.checkUser)
router.post('/check-email', authController.checkEmail)
router.get('/me', authMiddleware, authController.getCurrentUser)

module.exports = router