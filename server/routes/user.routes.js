const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const upload = require('../config/multer')

router.get('/me', authMiddleware, userController.getCurrentUser)
router.put('/', authMiddleware, upload.single('photo'), userController.updateUser)
router.delete('/me', authMiddleware, userController.deleteUser);

module.exports = router