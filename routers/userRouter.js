const express = require('express');
const authController = require('./../controllers/authControllers');

const router = express();

router.route('/signup').post(authController.signup);

router.route('/login').post(authController.login);

router.route('/logout').post(authController.isLogin, authController.logout);

module.exports = router;
