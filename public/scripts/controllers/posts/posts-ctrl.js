postsModule.controller('PostsCtrl', ['$scope', '$stateParams', 'PostsService',
    function($scope, $stateParams, PostsService) {
        'use strict';

        $scope.currentPage = 1;
        $scope.totalPages = 1;

        getPosts($scope.currentPage);

        function getPosts(pageNumber) {
            PostsService.getPosts(pageNumber).then(function(res) {
                $scope.posts = res.data.posts;
                $scope.totalPages = res.data.totalPages;
            }, function(err) {
                deferred.reject(err);
            });
        }

        $scope.getFullPost = function(){
            PostsService.getFullPost($stateParams.permalink).then(function(res) {
                $scope.post = res.data;
            }, function(err) {
                deferred.reject(err);
            });
        };

        $scope.nextPage = function() {
            if ($scope.currentPage < $scope.totalPages) {
                getPosts($scope.currentPage + 1);
                $scope.currentPage = $scope.currentPage + 1
            }
        }

        $scope.prevPage = function() {
            if ($scope.currentPage > 1) {
                getPosts($scope.currentPage - 1);
                $scope.currentPage = $scope.currentPage - 1
            }
        }
    }
]);
