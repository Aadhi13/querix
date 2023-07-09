const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');

const authController = require('../controllers/userControllers/authController');
const signinSignupController = require('../controllers/userControllers/signin&signup');
const forgotPasswordController = require('../controllers/userControllers/forgotPasswordController');

router.get('/user-data', userAuth, authController.userDataGet); //Get user data from jwt token

router.post('/signup', signinSignupController.userSignup); //Sign up post request to create user account and send otp to verification
router.post('/otp-verify', signinSignupController.otpVerify); //Email verification through otp
router.post('/otp-resend', signinSignupController.otpResend); //Resend otp for email verification
router.post('/signin', signinSignupController.userSignin); //Sign in post request to login to existing account 
router.post('/signin-google', signinSignupController.userSigninGoogle);

router.post('/forgot-password', forgotPasswordController.otpSend);
router.post('/forgot-password/otp-resend', forgotPasswordController.otpResend);
router.post('/forgot-password/otp-verify', forgotPasswordController.otpVerify);
router.put('/forgot-password/new-password', userAuth, forgotPasswordController.newPassword);


module.exports = router;