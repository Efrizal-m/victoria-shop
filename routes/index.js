const UserController = require('../controllers/memberShipController/userController')
const ProfileController = require('../controllers/memberShipController/profileController')
const router = require('express').Router()
const Authentication = require('../middlewares/authentication')

// Route for Membership Module
router.post('/registration', UserController.registerUser)
router.post('/login', UserController.loginUser)

router.use(Authentication.userAuth)
router.get('/profile', ProfileController.getUserProfile)
router.put('/profile/update', ProfileController.updateProfile)
router.put('/profile/image', ProfileController.updateProfileImage)

// Route for Information Module
// router.get('/banner', Controller.getBanners)
// router.get('/services', Controller.getServices)

// Route for Transaction Module
// router.get('/balance', Controller.getBalance)
// router.post('/topup', Controller.upsertTopup)
// router.post('/transaction', Controller.upsertTransaction)
// router.get('/transaction/history', Controller.getTransactions)

module.exports = router