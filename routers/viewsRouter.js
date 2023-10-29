const express = require('express');
const userController = require('./../controllers/userController');
const passwordController = require('./../controllers/passwordController');

const router = express();

router.route('/signup').post(userController.createUser);

router.route('/users').get(userController.getAllUsers);

router.route('/create-password').post(passwordController.createPassword);

router.route('/passwords').get(passwordController.getAllPasswords);

router.get('/', (req, res) => {
  res.send('viewRouter route');
});

module.exports = router;
