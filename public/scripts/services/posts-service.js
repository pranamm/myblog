postsModule.factory('PostsService', ['$http', '$q',
    function($http, $q) {
        'use strict';
        var postsService = {};

        postsService.getPosts = function(pageNumber) {
            var deferred = $q.defer();

            $http.get('/api/clientPosts/' + pageNumber).then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        postsService.getFullPost = function(permalink){
            var deferred = $q.defer();

            $http.get('/api/fullPost/' + permalink).then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return postsService;
    }
]);
