/* 
 * @Author: pranam
 * @Date:   2014-11-05 23:14:44
 * @Last Modified by:   pranam
 * @Last Modified time: 2014-11-05 23:14:59
 */

var loginService = require('../services/login-service');

var LoginController = function() {};

LoginController.prototype.localLogin = function(req, res, next) {
    return loginService.localLogin(req, res, next);
};

/* Other login options will come here e.g facebook, twitter, google*/
LoginController.prototype.facebookLogin = function() {
    return null;
};

LoginController.prototype.twitterLogin = function() {
    return null;
};

LoginController.prototype.googleLogin = function() {
    return null;
};

module.exports = new LoginController();
