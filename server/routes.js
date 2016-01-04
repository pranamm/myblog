/*
 * @Author: pranam
 * @Date:   2014-10-30 23:37:40
 * @Last Modified by:   pranam
 * @Last Modified time: 2016-01-04 22:00:00
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
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/api/user', userController.registerUser);

    app.get('/api/profile', userController.getProfile);

    app.put('/api/profile/:id', userController.updateProfile);

    app.put('/api/updatePass/:id', userController.updatePassword);

    app.post('/api/draftPost', postsController.draftPost);

    app.post('/api/modifyPost/:id', postsController.modifyPost);

    app.get('/api/posts', postsController.getPosts);

    app.get('/api/post/:id', postsController.getPost);

    app.post('/api/publishPosts', postsController.publishPosts);

    app.post('/api/unPublishPosts', postsController.unPublishPosts);

    app.post('/api/deletePosts', postsController.deletePosts);
}
