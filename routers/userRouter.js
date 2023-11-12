const express = require('express');
const authController = require('./../controllers/authControllers');

const router = express();

router.route('/signup').post(authController.signup);

router.post('/forgot-password', authController.forgetPassword);
router.patch('/reset-password/:resetToken', authController.resetPassword);

router
  .route('/confirm-signup/:confirmToken')
  .post(authController.confirmSignup);

router.route('/login').post(authController.login);

router.route('/logout').post(authController.isLogin, authController.logout);

// update the non-crucial data of the user
router
  .route('/update-user')
  .patch(authController.isLogin, authController.updateUser);

module.exports = router;
