/* 
 * @Author: pranam
 * @Date:   2014-11-13 22:34:02
 * @Last Modified by:   pranam
 * @Last Modified time: 2014-12-19 23:32:51
 */

var postService = require('../services/posts-service'),
    SETTINGS = require('../../settings.js');

var PostController = function() {};

PostController.prototype.createPost = function(req, res) {
    var post = {
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        permalink: req.body.title.split(" ").join("_"),
        createdOn: req.body.createdOn,
        author: req.body.createdBy
    };

    postService.createPost(post)
        .then(function(post) {
            if (post) {
                SETTINGS.RESPONSE.errCode = 0;
                SETTINGS.RESPONSE.message = "Post created Successfully";
                SETTINGS.RESPONSE.data = post

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

PostController.prototype.editPost = function(req, res) {

}

PostController.prototype.publishPost = function(req, res) {

}

PostController.prototype.draftPost = function(req, res) {

}

PostController.prototype.deletePost = function(req, res) {

}
module.exports = new PostController();
