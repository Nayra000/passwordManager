const express = require('express');
const router = express();

const passwordController = require('./../controllers/passwordController');
const authController = require('./../controllers/authControllers');

router.use(authController.isLogin);

router
  .route('/')
  .get(passwordController.getAllPasswords)
  .post(passwordController.createPassword);

router
  .route('/:id')
  .delete(passwordController.deletePassword)
  .patch(passwordController.updatePassword);

module.exports = router;
