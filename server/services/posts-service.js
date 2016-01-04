/* 
 * @Author: pranam
 * @Date:   2014-11-13 22:34:19
 * @Last Modified by:   pranam
 * @Last Modified time: 2016-01-04 22:04:37
 */

var mongodb = require('mongodb'),
    Q = require('q'),
    SETTINGS = require('../../settings');

module.exports = {
    getPosts: function() {
        var deferred = Q.defer();

        SETTINGS.DB.collection('posts').find().toArray(function(err, posts) {
            if (err) {
                deferred.reject(new Error("Error getting posts."));
            } else {
                deferred.resolve(posts);
            }
        });

        return deferred.promise;
    },
    getPost: function(postId) {
        var deferred = Q.defer();

        SETTINGS.DB.collection('posts').findOne({
            _id: new mongodb.ObjectID(postId)
        }, function(err, post) {
            if (err) {
                deferred.reject(new Error("Error getting post."));
            } else {
                deferred.resolve(post);
            }
        });

        return deferred.promise;
    },
    createPost: function(post) {
        var deferred = Q.defer();

        SETTINGS.DB.collection('posts').insert(post, function(err, posts) {
            if (err) {
                deferred.reject(new Error("Error saving post."));
            } else {
                deferred.resolve(posts[0]);
            }
        });

        return deferred.promise;
    },
    draftPost: function(post) {
        var deferred = Q.defer();

        SETTINGS.DB.collection('posts').insert(post, function(err, posts) {
            if (err) {
                deferred.reject(new Error("Error saving draft."));
            } else {
                deferred.resolve(posts[0]);
            }
        });

        return deferred.promise;
    },
    modifyPost: function(postId, post) {
        var deferred = Q.defer();

        delete post._id;

        SETTINGS.DB.collection('posts').findAndModify({
            _id: new mongodb.ObjectID(postId)
        }, [], {
            $set: post
        }, {
            'new': true
        }, function(err, post) {
            if (err) {
                deferred.reject(new Error("Error updating post."));
            }

            deferred.resolve(post);
        });

        return deferred.promise;
    },
    publishPosts: function(posts) {
        var deferred = Q.defer();

        for (var pid = 0; pid < posts.length; pid++) {
            posts[pid] = new mongodb.ObjectID(posts[pid]);
        }

        SETTINGS.DB.collection('posts').update({
            _id: {
                '$in': posts
            }
        }, {
            $set: {
                "isPublished": true
            }
        }, {
            multi: true
        }, function(err, msg) {
            if (err) {
                deferred.reject(new Error("Unable to publish posts."));
            }

            deferred.resolve(msg);
        });

        return deferred.promise;
    },
    unPublishPosts: function(posts) {
        var deferred = Q.defer();

        for (var pid = 0; pid < posts.length; pid++) {
            posts[pid] = new mongodb.ObjectID(posts[pid]);
        }

        SETTINGS.DB.collection('posts').update({
            _id: {
                '$in': posts
            }
        }, {
            $set: {
                "isPublished": false
            }
        }, {
            multi: true
        }, function(err, msg) {
            if (err) {
                deferred.reject(new Error("Unable to un-publish posts."));
            }

            deferred.resolve(msg);
        });


        return deferred.promise;
    },
    deletePosts: function(posts) {
        var deferred = Q.defer();

        for (var pid = 0; pid < posts.length; pid++) {
            posts[pid] = new mongodb.ObjectID(posts[pid]);
        }

        SETTINGS.DB.collection('posts').remove({
            _id: {
                '$in': posts
            }
        }, function(err, msg) {
            if (err) {
                deferred.reject(new Error("Unable to delete posts."));
            }

            deferred.resolve(msg);
        });

        return deferred.promise;
    }
};
