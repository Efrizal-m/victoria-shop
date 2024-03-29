const router = require('express').Router()
const Authentication = require('../middlewares/authentication')
const UserController = require('../controllers/membershipController/userController')
const ProfileController = require('../controllers/membershipController/profileController')
const InformationController = require('../controllers/informationController/informationController')

// Route for Membership Module
router.post('/registration', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.use(Authentication.userAuth)
router.get('/profile', ProfileController.getUserProfile)
router.put('/profile/update', ProfileController.updateProfile)
router.put('/profile/image', ProfileController.updateProfileImage)

// Route for Information Module
router.get('/banner', InformationController.getBanners)
router.get('/services', InformationController.getServices)

// Route for Transaction Module
// router.get('/balance', Controller.getBalance)
// router.post('/topup', Controller.upsertTopup)
// router.post('/transaction', Controller.upsertTransaction)
// router.get('/transaction/history', Controller.getTransactions)

module.exports = router