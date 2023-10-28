const express = require('express');
const Router = express.Router();

const passwordController = require('./../controllers/passwordController');
const authController = require('./../controllers/authControllers');

Router.use(authController.isLogin);

Router.route('/')
  .get(passwordController.getAllPasswords)
  .post(passwordController.createPassword);

Router.route('/:id')
  .delete(passwordController.deletePassword)
  .patch(passwordController.updatePassword);