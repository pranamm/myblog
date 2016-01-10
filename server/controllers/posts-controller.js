/* 
 * @Author: pranam
 * @Date:   2014-11-13 22:34:02
 * @Last Modified by:   pranam
 * @Last Modified time: 2016-01-09 23:51:22
 */

var postService = require('../services/posts-service'),
    SETTINGS = require('../../settings.js');

var PostController = function() {};

PostController.prototype.getPosts = function(req, res) {
    postService.getPosts({})
        .then(function(posts) {
            if (posts) {
                SETTINGS.RESPONSE.errCode = 0;
                SETTINGS.RESPONSE.message = "";
                SETTINGS.RESPONSE.data = posts

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

PostController.prototype.getPostsForClient = function(req, res) {
    postService.getPosts({
            'isPublished': true
        }, req.params.pageNumber)
        .then(function(posts) {
            if (posts) {
                posts.forEach(function(item, idx) {
                    item.createdOn = (item._id).getTimestamp()
                })
                SETTINGS.RESPONSE.errCode = 0;
                SETTINGS.RESPONSE.message = "";
                SETTINGS.RESPONSE.data = posts

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

PostController.prototype.getPost = function(req, res) {
    postService.getPost(req.params.id)
        .then(function(post) {
            if (post) {
                SETTINGS.RESPONSE.errCode = 0;
                SETTINGS.RESPONSE.message = "";
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

PostController.prototype.draftPost = function(req, res) {
    var post = {
        title: req.body.title,
        tags: req.body.tags,
        permalink: req.body.title.split(" ").join("_"),
        isPublished: false,
        author: {
            id: req.user._id,
            name: req.user.firstName + " " + req.user.lastName
        },
        postBody: req.body.postBody
    };

    postService.draftPost(post)
        .then(function(post) {
            if (post) {
                SETTINGS.RESPONSE.errCode = 0;
                SETTINGS.RESPONSE.message = "Draft successfully created";
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

PostController.prototype.modifyPost = function(req, res) {
    var post = {
        title: req.body.title,
        tags: req.body.tags,
        permalink: req.body.title.split(" ").join("_"),
        isPublished: req.body.isPublished,
        author: {
            id: req.user._id,
            name: req.user.firstName + " " + req.user.lastName
        },
        postBody: req.body.postBody
    };

    postService.modifyPost(req.params.id, post)
        .then(function(post) {
            if (post) {
                SETTINGS.RESPONSE.errCode = 0;
                SETTINGS.RESPONSE.message = "Post modified successfully";
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

PostController.prototype.publishPosts = function(req, res) {
    postService.publishPosts(req.body)
        .then(function(msg) {
            if (msg) {
                SETTINGS.RESPONSE.errCode = 0;
                SETTINGS.RESPONSE.message = "Posts successfully published.";
                SETTINGS.RESPONSE.data = msg

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

PostController.prototype.unPublishPosts = function(req, res) {
    postService.unPublishPosts(req.body)
        .then(function(msg) {
            if (msg) {
                SETTINGS.RESPONSE.errCode = 0;
                SETTINGS.RESPONSE.message = "Posts successfully un-published.";
                SETTINGS.RESPONSE.data = msg

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

PostController.prototype.deletePosts = function(req, res) {
    postService.deletePosts(req.body)
        .then(function(msg) {
            if (msg) {
                SETTINGS.RESPONSE.errCode = 0;
                SETTINGS.RESPONSE.message = "Posts successfully deleted.";
                SETTINGS.RESPONSE.data = msg

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

module.exports = new PostController();
