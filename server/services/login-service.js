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
            return res.status(401).send(err);
        }

        var finalUser = {
            _id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }

        req.user = finalUser;

        req.logIn(finalUser, function(err) {
            if (err) {
                return next(err);
            }

            return res.status(200).send(req.user);
        });
    })(req, res, next);
};

module.exports.facebookLogin = function() {};
module.exports.twitterLogin = function() {};
module.exports.googleLogin = function() {};

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
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
            email: username
        }, function(err, user) {
            // Condition to deal with mongodb errors or network errors
            if (err) {
                done(err, false);
            }

            // Condition to deal with invalid user
            if (!user) {
                done("Invalid username or password", null);
            }

            // Condition to deal with invalid password
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    req.user = user;
                    done(null, user);
                } else {
                    req.user = null;
                    done("Invalid username or password", null);
                }
            }
        });
    }
));
