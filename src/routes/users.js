
const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

//Signin

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect:'/notes',
    failureRedirect:'/users/signin',
    failureFlash:true
}));

//Signup

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    if(password != confirm_password){
        errors.push({text: 'Password do not match'});
    }
    if(password.length < 4 ){
        errors.push({text: 'Password must be at least 4 characteres'});
    }
    if(errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        const emailUser = await User.findOne({email: email})
        if(emailUser) {
            req.flash('error_msg', 'The email is already in use');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');
    }

});

 //Profile

 router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/');
});

module.exports = router;