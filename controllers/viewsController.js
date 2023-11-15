const passwordsModel = require('./../models/passwordModel');


exports.getOverview = (req , res )=>{
    try{
        res.status(200).render('overview', {title : 'Overview'})
    }
    catch(err){
        res.status(404).json({
            status:'fail' ,
            message : err.message
        })
    }
};


exports.getSigninForm = (req , res )=>{
    try{
        res.status(200).render('signin', {title : 'Sign in'})
    }
    catch(err){
        res.status(404).json({
            status:'fail' ,
            message : err.message
        })
    }
};

exports.getSignupForm =(req , res)=>{
    try{
        res.status(200).render('signup', {title : 'Sign up'})
    }
    catch(err){
        res.status(404).json({
            status:'fail' ,
            message : err.message
        })
    }
};

exports.getMyPasswords = async (req , res )=>{
    try{
        const userPasswords = await passwordsModel.find({user :req.user.id});
        res.status(200).render('mypasswords', {title : 'My passwords'  ,userPasswords});
    }
    catch(err){
        res.status(404).json({
            status:'fail' ,
            message : err.message
        })
    }

};