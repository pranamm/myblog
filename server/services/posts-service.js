/* 
 * @Author: pranam
 * @Date:   2014-11-13 22:34:19
 * @Last Modified by:   pranam
 * @Last Modified time: 2016-01-11 23:34:27
 */

var mongodb = require('mongodb'),
    Q = require('q'),
    async = require('async'),
    SETTINGS = require('../../settings');

module.exports = {
    getPosts: function(filter, pageNumber) {
        var deferred = Q.defer();

        if (pageNumber) {
            async.parallel(
                [
                    function(callback) {
                        SETTINGS.DB.collection('posts').find(filter).sort([
                            ['_id', -1]
                        ]).skip((pageNumber - 1) * SETTINGS.POST_PAGESIZE).limit(SETTINGS.POST_PAGESIZE).toArray(function(err, posts) {
                            if (err) {
                                callback(new Error("Error getting posts."), null);
                            } else {
                                callback(null, posts);
                            }
                        });
                    },
                    function(callback) {
                        SETTINGS.DB.collection('posts').count(filter, function(err, postCount) {
                            if (err) {
                                callback(new Error("Error getting post count."), null);
                            } else {
                                callback(null, Math.ceil(postCount / SETTINGS.POST_PAGESIZE));
                            }
                        });
                    }
                ],
                function(err, results) {
                    if (err) {
                        deferred.reject(new Error("Error getting posts."));
                    } else {
                        deferred.resolve(results);
                    }
                });
        } else {
            SETTINGS.DB.collection('posts').find(filter).toArray(function(err, posts) {
                if (err) {
                    deferred.reject(new Error("Error getting posts."));
                } else {
                    deferred.resolve(posts);
                }
            });
        }

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
    getFullPost: function(permalink) {
        var deferred = Q.defer();

        SETTINGS.DB.collection('posts').findOne({
            permalink: permalink
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
    },
    getTags: function(){
        var deferred = Q.defer();

        SETTINGS.DB.collection('posts').aggregate(
            { $unwind : "$tags" },
            { $group: {_id: "$tags", count: { $sum:1}}}
        , function(err, result) {
            if (err) {
                deferred.reject(new Error("Unable to get tags."));
            }

            deferred.resolve(result);
        });

        return deferred.promise;
    }
};
