profileModule.controller('ProfileCtrl', ['$scope', 'ProfileService',
    function($scope, ProfileService) {
        'use strict';

        (function getProfile() {
            var skillSet = [];
            ProfileService.getProfile().then(function(res) {
                /*if (res.data.skillSet) {
                    res.data.skillSet.forEach(function(item, idx) {
                        item = {
                            "text": item
                        };
                        skillSet.push(item);
                    });

                    $scope.skillSet = skillSet;
                }*/
                $scope.profile = res.data;
            }, function(err) {
                deferred.reject(err);
            });
        })();
    }
]);
