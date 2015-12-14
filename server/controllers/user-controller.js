/*
 * @Author: pranam
 * @Date:   2014-11-05 23:14:44
 * @Last Modified by:   pranam
 * @Last Modified time: 2014-11-13 22:22:02
 */

var userService = require('../services/user-service'),
    SETTINGS = require('../../settings.js');

var UserController = function() {};

UserController.prototype.registerUser = function(req, res) {
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };

    userService.registerUser(user)
        .then(function(user) {
            if (user) {
                SETTINGS.RESPONSE.errCode = 0;
                SETTINGS.RESPONSE.message = "User registered successfully";
                SETTINGS.RESPONSE.data = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                };

                res.send(SETTINGS.RESPONSE);
            }
        })
        .fail(function(err) {
            SETTINGS.RESPONSE.errCode = 1;
            SETTINGS.RESPONSE.message = err.message;
            SETTINGS.RESPONSE.data = null;
            res.send(SETTINGS.RESPONSE);
        });
};

UserController.prototype.getProfile = function(req, res) {
    userService.getProfile()
        .then(function(user) {
            if (user) {
                SETTINGS.RESPONSE.errCode = 0;
                SETTINGS.RESPONSE.message = "";
                SETTINGS.RESPONSE.data = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    profilePic: user.profilePic
                };

                res.send(SETTINGS.RESPONSE);
            }
        })
        .fail(function(err) {
            SETTINGS.RESPONSE.errCode = 1;
            SETTINGS.RESPONSE.message = err.message;
            SETTINGS.RESPONSE.data = null;
            res.send(SETTINGS.RESPONSE);
        });
}

module.exports = new UserController();
