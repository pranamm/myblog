/* 
 * @Author: pranam
 * @Date:   2015-01-15 21:48:31
 * @Last Modified by:   pranam
 * @Last Modified time: 2015-01-15 21:56:15
 */

'use strict';
app.factory('PostService', ['$http',
    function($http) {
        var postService = {};

        postService.getPosts = function() {
            return $http.get('/api/posts').then(function(res) {
                var posts = res.data;
                return posts;
            });
        };

        postService.getPost = function(postId) {
            return $http.get('/api/post/' + postId).then(function(res) {
                var post = res.data;
                return post;
            });
        };

        postService.createPost = function(post) {
            return $http.post('/api/posts', post).then(function(res) {
                var msg = res.data;
                return msg;
            });
        };

        postService.editPost = function(post, postImage) {
            var postData = new FormData();
            if (postImage)
                postData.append('file', postImage[0]);

            postData.append('data', JSON.stringify(post));

            return $http.put('/api/post/' + post._id, postData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function(res) {
                var msg = res.data;
                return msg;
            });
        };

        postService.deletePost = function(postId) {
            return $http.delete('/api/post/' + postId).then(function(res) {
                var msg = res.data;
                return msg;
            });
        };

        return postService;
    }
])
