const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');

const authController = require('../controllers/userControllers/authController');

router.get('/user-data', userAuth, authController.userDataGet); //Get user data from jwt token

module.exports = router;