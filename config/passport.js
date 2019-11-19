var passport = require('passport');
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//User sign up
passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},  function(req, email, password, done) {
        //check for validation parameters
        req.checkBody('email', 'Email is invalid!').notEmpty().isEmail();
        req.checkBody('password', 'Password is invalid!').notEmpty().isLength({min:4});
        //handling validation errors
        var errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach(function(error) {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }

        User.findOne({'email' : email}, 
            function(err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false, {message: 'Email is already in database.'});
                }
                var newUser = new User();
                newUser.email = email;
                newUser.password = newUser.encryptPassword(password);
                newUser.save(function(err, result) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                });
            }
        );
    }
));

//User sign in
passport.use('local.signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    //check for validation parameters
    req.checkBody('email', 'Email is invalid!').notEmpty().isEmail();
    req.checkBody('password', 'Password is invalid!').notEmpty();
    //handling validation errors
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'User not in database!'});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Password is wrong!'});
        }
        return done(null, user);
    });
}));



































//This is an e-commerce website created by Romanus Njogu Borges --- @romeyborges. 