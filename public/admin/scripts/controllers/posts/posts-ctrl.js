postsModule.controller('PostsCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'UtilService', 'PostService',
    function($scope, $stateParams, $rootScope, $location, UtilService, PostService) {
        'use strict';

        $scope.currentPage = 'Draft Post';
        $scope.postBody = [];
        $scope.selectedPosts = [];

        $scope.insertPostItem = function(type, idx){
            var postItem = {
                type: type,
                value: ''
            };

            //$scope.postBody.push(postItem);
            $scope.postBody.splice(idx + 1, 0, postItem);
        }

        $scope.deletePostItem = function(idx) {
            $scope.postBody.splice(idx, 1);
        };

        $scope.draftPost = function() {
            var tags = [];

            $scope.tags.forEach(function(item, idx) {
                tags.push(item.text);
            });
            if ($scope.draftPostForm.$valid) {
                $scope.post.tags = tags;

                /*PostService.draftPost($scope.post).then(function(response) {
                    $rootScope.$broadcast('notification', {
                        message: response.message,
                        type: "success"
                    }, true);
                    $location.path('/home/posts');
                }, function() {
                    $rootScope.$broadcast('notification', {
                        message: "Error creating draft post.",
                        type: "danger"
                    }, true);
                });*/
            }
        }

        $scope.getAllPosts = function() {
            PostService.getPosts().then(function(response) {
                $scope.posts = response.data;
            }, function() {
                $rootScope.$broadcast('notification', {
                    message: "Error loading posts.",
                    type: "danger"
                }, true);
            });
        }

        $scope.getPost = function(postId) {
            PostService.getPost(postId).then(function(response) {
                var tags = [];
                if (response.data.tags) {
                    response.data.tags.forEach(function(item, idx) {
                        item = {
                            "text": item
                        };
                        tags.push(item);
                    });

                    $scope.tags = tags;
                }
                $scope.post = response.data;
            }, function() {
                $rootScope.$broadcast('notification', {
                    message: "Error loading post.",
                    type: "danger"
                }, true);
            })
        }

        $scope.setPostSelected = function(postId) {
            if ($scope.selectedPosts.indexOf(postId) == -1) {
                $scope.selectedPosts.push(postId);
            } else {
                $scope.selectedPosts.splice($scope.selectedPosts.indexOf(postId), 1);
            }
            console.log($scope.selectedPosts);
        };

        $scope.confirmPublishPost = function(postId) {
            UtilService.showConfirmationBox('', 'Publish Post', 'Are you sure you want to publish this post?', publishPost, postId);
        };

        $scope.confirmPublishPosts = function() {
            if ($scope.selectedPosts.length)
                UtilService.showConfirmationBox('', 'Publish Posts', 'Are you sure you want to publish the selected posts?', publishPost, $scope.selectedPosts);
        };

        $scope.confirmUnPublishPost = function(postId) {
            UtilService.showConfirmationBox('', 'Un-Publish Post', 'Are you sure you want to un-publish this post?', unPublishPost, postId);
        };

        $scope.confirmUnPublishPosts = function() {
            if ($scope.selectedPosts.length)
                UtilService.showConfirmationBox('', 'Un-Publish Posts', 'Are you sure you want to un-publish the selected posts?', unPublishPost, $scope.selectedPosts);
        };

        $scope.confirmDeletePost = function(postId) {
            UtilService.showConfirmationBox('', 'Delete Post', 'Are you sure you want to delete this post?', deletePost, postId);
        };

        $scope.confirmDeletePosts = function() {
            if ($scope.selectedPosts.length)
                UtilService.showConfirmationBox('', 'Delete Posts', 'Are you sure you want to delete the selected posts?', deletePost, $scope.selectedPosts);
        };

        function publishPost(post) {
            if (!(post instanceof Array)) {
                $scope.selectedPosts = [post]
            }
            PostService.publishPosts($scope.selectedPosts).then(function(msg) {
                $scope.selectedPosts = [];
                $scope.getAllPosts();
            }, function() {
                $scope.selectedPosts = [];
                $rootScope.$broadcast('notification', {
                    message: "Error publishing post.",
                    type: "danger"
                }, true);
            });
        }

        function unPublishPost(post) {
            if (!(post instanceof Array)) {
                $scope.selectedPosts = [post]
            }
            PostService.unPublishPosts($scope.selectedPosts).then(function(msg) {
                $scope.selectedPosts = [];
                $scope.getAllPosts();
            }, function() {
                $scope.selectedPosts = [];
                $rootScope.$broadcast('notification', {
                    message: "Error unpublishing post.",
                    type: "danger"
                }, true);
            });
        }

        function deletePost(post) {
            if (!(post instanceof Array)) {
                $scope.selectedPosts = [post];
            }
            PostService.deletePosts($scope.selectedPosts).then(function(msg) {
                $scope.selectedPosts = [];
                $scope.getAllPosts();
            }, function() {
                $scope.selectedPosts = [];
                $rootScope.$broadcast('notification', {
                    message: "Error deleting post.",
                    type: "danger"
                }, true);
            });
        }

        if ($stateParams.postId) {
            $scope.isNew = false;
            $scope.currentPage = 'Modify Post';
            $scope.getPost($stateParams.postId);
        }
    }
]);

postsModule.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}])
