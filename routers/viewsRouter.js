const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authControllers');

const express = require('express');
const router = express.Router();



router.get('/' ,viewsController.getOverview);
router.get('/signin',viewsController.getSigninForm);
router.get('/signup',viewsController.getSignupForm);
router.get('/mypasswords',authController.isLogin,viewsController.getMyPasswords);


module.exports = router;