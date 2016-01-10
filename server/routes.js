/*
 * @Author: pranam
 * @Date:   2014-10-30 23:37:40
 * @Last Modified by:   pranam
 * @Last Modified time: 2016-01-09 22:19:48
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

    app.post('/api/user', auth, userController.registerUser);

    app.get('/api/profile', userController.getProfile);

    app.put('/api/profile/:id', auth, userController.updateProfile);

    app.put('/api/updatePass/:id', auth, userController.updatePassword);

    app.post('/api/draftPost', auth, postsController.draftPost);

    app.post('/api/modifyPost/:id', auth, postsController.modifyPost);

    app.get('/api/posts', auth, postsController.getPosts);

    app.get('/api/clientPosts/:pageNumber', postsController.getPostsForClient);

    app.get('/api/post/:id', postsController.getPost);

    app.post('/api/publishPosts', auth, postsController.publishPosts);

    app.post('/api/unPublishPosts', auth, postsController.unPublishPosts);

    app.post('/api/deletePosts', auth, postsController.deletePosts);
}
