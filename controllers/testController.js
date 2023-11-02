const User = require('../models/userModel');
const Password = require('../models/passwordModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      users,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

exports.getAllPasswords = async (req, res, next) => {
  try {
    const passwords = await Password.find().select('-__v');

    res.status(200).json({
      status: 'succes',
      passwords,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

exports.createPassword = async (req, res, next) => {
  try {
    const passwords = await Password.create({
      hubName: req.body.hubName,
      email: req.body.email,
      password: req.body.password,
      user: req.body.id,
    });

    res.status(200).json({
      status: 'succes',
      passwords,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};
