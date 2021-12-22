const express = require('express');
const { register,login,getMe,ForgetPassword,resetPassword,updateDetails,updatePassword,logout } = require('../controllers/auth');
// const {protect} = require('../middleware/Auth')
const router = express.Router();
const {protect,authorize} = require('../middleware/Auth')

router.post('/register', register);
router.post('/login',login)
router.post('/Forgetpassword',ForgetPassword)
router.put('/resetPassword/:resettoken',resetPassword)
router.put('/updateDetails',protect,updateDetails)
router.put('/updatePassword',protect,updatePassword)
router.get('/me',protect,getMe)
router.get('/logout', logout);
module.exports = router;
