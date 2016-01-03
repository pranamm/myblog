postsModule.factory('PostService', ['$http', '$q',
    function($http, $q) {
        'use strict';
        var postService = {};

        postService.getPosts = function() {
            var deferred = $q.defer();

            $http.get('/api/posts').then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        postService.getPost = function(postId) {
            var deferred = $q.defer();

            $http.get('/api/post/' + postId).then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        postService.draftPost = function(post) {
            var deferred = $q.defer();

            $http.post('/api/draftPost', post).then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        postService.publishPosts = function(posts) {
            var deferred = $q.defer();

            $http.post('/api/publishPosts/', posts).then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        postService.unPublishPosts = function(posts) {
            var deferred = $q.defer();

            $http.post('/api/unPublishPosts/', posts).then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        postService.deletePosts = function(posts) {
            var deferred = $q.defer();

            $http.post('/api/deletePosts/', posts).then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return postService;
    }
]);
