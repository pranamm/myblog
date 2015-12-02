/* 
 * @Author: pranam
 * @Date:   2014-12-20 21:03:33
 * @Last Modified by:   pranam
 * @Last Modified time: 2015-01-15 21:59:25
 */

'use strict';
app.controller('CreatePostCtrl', ['$scope', 'PostService',
    function($scope, PostService) {
        $scope.createPost = function() {
            var post = {
                title: $scope.title,
                body: $scope.body,
                tags: $scope.tags
            };

            PostService.createPost(post).then(function(msg) {
                console.log('created successfully');
            }, function() {
                console.log("Error Loading Categories");
            });
        }
    }
])
