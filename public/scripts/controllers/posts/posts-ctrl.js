postsModule.controller('PostsCtrl', ['$scope', 'PostsService',
    function($scope, PostsService) {
        'use strict';

        $scope.getPosts = function(pageNumber) {
            PostsService.getPosts(pageNumber).then(function(res) {
                $scope.posts = res.data;
            }, function(err) {
                deferred.reject(err);
            });
        }

        $scope.getPosts(1);
    }
]);
