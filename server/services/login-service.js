/* 
 * @Author: pranam
 * @Date:   2014-10-28 23:09:21
 * @Last Modified by:   pranam
 * @Last Modified time: 2015-02-08 21:35:55
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    bcrypt = require('bcryptjs'),
    SETTINGS = require('../../settings');

module.exports.localLogin = function(req, res, next) {
    return passport.authenticate('local-signin', function(err, user, msg) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/');
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/api/loggedin/');
        });
    })(req, res, next);
};

module.exports.facebookLogin = function() {};
module.exports.twitterLogin = function() {};
module.exports.googleLogin = function() {};

passport.serializeUser(function(user, done) {
    console.log("serializing " + user.email);
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log("deserializing " + obj);
    done(null, obj);
});

// Use this strategy for Local Signin
passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        SETTINGS.DB.collection('users').findOne({
            email: username,
            isAdmin: true
        }, function(err, user) {
            // Condition to deal with mongodb errors or network errors
            if (err) {
                done(err, false);
            }

            // Condition to deal with invalid user
            if (!user) {
                done(new Error("Unknown user"), false, {
                    message: 'Unknown user.'
                });
            }

            // Condition to deal with invalid password
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    req.user = user;
                    done(null, user);
                } else {
                    req.user = null;
                    done(new Error("Invalid credentials"), false, {
                        message: 'Invalid credentials.'
                    });
                }
            }
        });
    }
));
