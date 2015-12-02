/* 
 * @Author: pranam
 * @Date:   2014-10-30 23:37:40
 * @Last Modified by:   pranam
 * @Last Modified time: 2014-11-13 23:29:48
 */

var loginController = require('./controllers/login-controller'),
    userController = require('./controllers/user-controller'),
    postsController = require('./controllers/posts-controller');

var app = null;

// Middleware function to check the user authentication
var auth = function(req, res, next) {
    if (!req.isAuthenticated())
        res.sendStatus(401);
    else
        next();
};

module.exports.initApp = function(exp) {
    app = exp;

    app.post('/api/login', function(req, res, next) {
        loginController.localLogin(req, res, next);
    });

    app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? true : false);
    });

    app.post('/api/user', userController.registerUser);

    app.get('/api/profile', userController.getProfile);

    app.post('/api/posts', postsController.createPost);
}
