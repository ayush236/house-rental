const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs')

exports.getlogin=(req, res, next)=>{
    res.render("auth/login.ejs",{title :"login page",
        isLoggedIn: false
    })
};

exports.postlogin=async(req, res, next)=>{
    // console.log(req.body);
    const {Email, password} =req.body;
    // console.log(email)
    const user = await User.findOne({Email});  // error fix it 
    console.log("the value of user is",user);
    if(!user){
        console.log("not found")
        res.status(422).render('auth/login',{
            title:'login',
            isLoggedIn: false,
            errors:["invalide! user does not exist"],
            oldInput:{Email}
        })
    }else{
        console.log(req.body);
    req.session.isLoggedIn = true;
    // req.session.isLoggedIn = true;    
    res.redirect('/');
    }

    

}
exports.postlogout=(req, res, next)=>{
    req.session.destroy(()=>{
        
    res.redirect('/login');

    })
}

exports.getSignup =(req, res, next)=>{
        
    res.render("auth/signup",{
        title:"signup",
        isLoggedIn: false
    })
}

// validation
exports.postSignup=[
    
    //first name 
    check("Firstname")
    .notEmpty()
    .withMessage('First name is required')
    .isLength({min : 2})
    .withMessage('First name must be at least 2 characters long')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('First name must contain letter'),

    //second name
    check("Lastname")
    .notEmpty()
    .withMessage('last name is required')
    .isLength({min : 2})
    .withMessage('last name must be at least 2 characters long')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Last name must contain letter'),

    // email
    check('Email')
    .isEmail()
    .withMessage('please enter the valid email')
    .normalizeEmail(),

    //password
    check("password")
    .isLength({min: 8})
    .withMessage("password must be at least 8 character long")
    .matches(/[a-z]/)
    .withMessage('password must have at least the lowercase letter')
    .matches(/[A-z]/)
    .withMessage('password must have at least the uppercase letter')
    .matches(/[!@#$%^&*()_+{}|:"?><,../?"]/)
    .withMessage('password must have at least one speacal character')
    .trim(),

    //conform password
    check("Conform_password")
    .trim()
    .custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('password do not match');

        }
        return true;
    }),

    //User type validation
    check("userType")
    .notEmpty()
    .withMessage('user is required')
    .isIn(['Host', 'Guest'])
    .withMessage('user is invalid'),

    
    //accept the term and condition
    check('condition')
    .notEmpty()
    .withMessage("should accept the terms and condition")
    .custom((value)=>{
        if(value !== 'true'){
            throw new Error("you must accept the terms amd condition")
        }
        return true;
    }),
    
    // final handler middleware
    (req, res, next)=>{
        const {Firstname, Lastname, Email, password, userType} =req.body
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).render("auth/signup",{
                title: "sign up",
                isLoggedIn : false,
                errors: errors.array().map(err=>err.msg),
                oldInput:{
                    Firstname:Firstname|| '', 
                    Lastname:Lastname||'', 
                    Email:Email||'', 
                    password:password||'',
                    userType:userType||''
                }
            })
        }

        //hashing function bcrypt
        bcrypt.hash(password, 12).then(hashedpassword=>{
            const user = new User({Firstname, Lastname, Email, password: hashedpassword, userType})
        return user.save()
        }).then(()=>{
          res.redirect('/login')
        }).catch(err=>{
            return res.status(422).render("auth/signup",{
                title: "sign up",
                isLoggedIn : false,
                errors: [err.message],
                oldInput:{
                    Firstname, 
                    Lastname, 
                    Email, 
                    userType
                }
        })

})
}]