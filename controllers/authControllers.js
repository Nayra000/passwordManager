const userModel = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const {promisify} = require('utils');


const createSendToken = (res , status , user) => {
  const token = jwt.sign({id:user.id} ,process.env.SECRET_KEY,{expiresIn:process.env.EXPIRE_IN});
  const cookieOptions = {
    expires :new Date (Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)),
    httpOnly:true
  };
  res.cookie('jwt' ,token ,cookieOptions);
  res.status(status).json({
    status:'success',
    user  ,
    token
  });

};

exports.singup = async(req , res) => {
  try {
    const newUser = await userModel.create({
      name :req.body.name ,
      password :req.body.password , 
      passwordConfirm :req.body.passwordConfirm ,
      email :req.body.email
    });
    createSendToken(res ,201 ,newUser);
  }
  catch (err) {
    res.status(400).json({
      status:'fail' ,
      message :err.message
    });
  }

};


exports.login = async(req , res) => {
  try {
    const { email ,password } = req.body;
    if (!email) {
      return res.status(400).json({
        status :'fail' ,
        message:'You must provide an email address'
      });
    }
    if (!password) {
      return res.status(400).json({
        status :'fail' ,
        message:'You must provide a password'
      });
    }
    const user = await userModel.findOne({email}).select('+password');
    if (!user || !await user.correctPassword(password , user.password)) {
      return res.status(404).json({
        status:'fail' ,
        message:'There is no user with that email and password'
      });
    }
    createSendToken(res ,200 ,user);
  }
  
  catch (err) {
    res.status(401).json({
      status:'fail' ,
      message :err.message
    });

  }
};

exports.isLogin = async (req ,res ,next) => {
  if (!req.cookies.jwt) {
    return res.status(401).json({
      status:'fail' ,
      message:'You must be logged in to access this page'
    });
  }
  const token = req.cookies.jwt;
  const decode = await promisify(jwt.verify)(token ,process.env.SECRET_KEY);
  const user = await userModel.findById(decode.id);
  if (!user) {
    return res.status(401).json({
      status:'fail' ,
      message:'User not found'
    });
  }
  if (user.changedPasswordAfter(decode.iat)) {
    return res.status(401).json({
      status:'fail' ,
      message:'Password is incorrect'
    });
  }
  req.user = user;
  next();
};

/* exports.logout= ()=>{} */