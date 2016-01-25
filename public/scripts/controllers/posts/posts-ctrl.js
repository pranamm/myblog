postsModule.controller('PostsCtrl', ['$scope', '$stateParams', 'PostsService',
    function($scope, $stateParams, PostsService) {
        'use strict';

        $scope.currentPage = 1;
        $scope.totalPages = 1;
        $scope.postsType = 'all';

        //getPosts($scope.currentPage);

        function getPosts(pageNumber) {
            PostsService.getPosts(pageNumber).then(function(res) {
                $scope.posts = res.data.posts;
                $scope.totalPages = res.data.totalPages;
            }, function(err) {
                deferred.reject(err);
            });
        }

        function getPostsByTags(tag, pageNumber){
            console.log('currentPage: ' + $scope.currentPage);
            console.log('tag: ' + tag);
            PostsService.getPostsByTags(tag, pageNumber).then(function(res) {
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
                if($scope.postsType == 'tag'){
                    getPostsByTags($stateParams.tagName, $scope.currentPage + 1);
                } else {
                    getPosts($scope.currentPage + 1);
                }
                $scope.currentPage = $scope.currentPage + 1
            }
        }

        $scope.prevPage = function() {
            if ($scope.currentPage > 1) {
                if($scope.postsType == 'tag'){
                    getPostsByTags($stateParams.tagName, $scope.currentPage - 1);
                } else {
                    getPosts($scope.currentPage - 1);
                }
                $scope.currentPage = $scope.currentPage - 1
            }
        }

        if($stateParams.tagName){
            $scope.currentPage = 1;
            $scope.postsType = 'tag';
            getPostsByTags($stateParams.tagName, $scope.currentPage);
        } else {
            $scope.postsType = 'all';
            getPosts($scope.currentPage);
        }
    }
]);
