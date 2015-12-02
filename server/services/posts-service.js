/* 
 * @Author: pranam
 * @Date:   2014-11-13 22:34:19
 * @Last Modified by:   pranam
 * @Last Modified time: 2014-12-18 23:22:00
 */

var Q = require('q'),
    SETTINGS = require('../../settings');

module.exports = {
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
    editPost: function(post) {

    }
};
