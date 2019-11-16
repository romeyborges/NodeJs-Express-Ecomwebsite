var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

//checks if user is logged in with account
router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});

/*router.get('/checkout', isLoggedIn, function(req, res, next) {
    res.render('shop/checkout');
});*/

//check if user is logged in with account before accessing the profiles page. if not, redirects to home page
router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/', notLoggedIn, function(req, res, next) {
    next();
});

//creating route for sign up page
router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  });

//creating authentication for sign up page
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));
  
//creating route for sign in page
router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
  
//creatinng authentication for sign in page
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

/*//creating route for checkout page
router.get('/checkout', function(req, res, next) {
    var messages = req.flash('error');
    res.render('shop/checkout', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
  
//creatinng authentication for checkout page
router.post('/checkout', passport.authenticate('local.checkout', {
    successRedirect: '/shop/success',
    failureRedirect: '/shop/checkout',
    failureFlash: true
}));*/

module.exports = router;

//checks if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

//checks if user is logged in
function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}