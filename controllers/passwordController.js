const Password = require('./../models/passwordModel');

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
    const passwords = await Password.create(req.body);

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
