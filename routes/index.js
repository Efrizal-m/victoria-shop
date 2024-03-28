const Controller = require('../controllers/controller')
const router = require('express').Router()

// Route for Membership Module
router.post('/registration', Controller.registerUser)
router.post('/login', Controller.loginUser)
// router.get('/profile', Controller.getUser)
// router.put('/profile/update', Controller.updateUser)
// router.put('/profile/image', Controller.updateUserImage)

// Route for Information Module
// router.get('/banner', Controller.getBanners)
// router.get('/services', Controller.getServices)

// Route for Transaction Module
// router.get('/balance', Controller.getBalance)
// router.post('/topup', Controller.upsertTopup)
// router.post('/transaction', Controller.upsertTransaction)
// router.get('/transaction/history', Controller.getTransactions)

module.exports = mainRouter