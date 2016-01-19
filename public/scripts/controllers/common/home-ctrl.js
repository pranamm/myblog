commonModule.controller('HomeCtrl', ['$scope', 'PostsService',
    function($scope, PostsService) {
        'use strict';

        $scope.getTags = function() {
            PostsService.getTags().then(function(res) {
                var words = res.data;
                words.forEach(function(item, idx){
                    item.text = item._id;
                    item.link = "#/tags/" + item._id;
                })
                console.log(words);
                $scope.words = words;
            }, function(err) {
                deferred.reject(err);
            });
        }
    }
]);
