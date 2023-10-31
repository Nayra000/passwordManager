const express = require('express');
const testController = require('../controllers/testController');

const router = express();

router.route('/users').get(testController.getAllUsers);

router.route('/passwords').get(testController.getAllPasswords);

router.route('/create-password').post(testController.createPassword);

router.route('/create-user').post(testController.createUser);

router.get('/', (req, res) => {
  res.send('testRouter route');
});

module.exports = router;
