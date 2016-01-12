commonModule.controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', '$state',
    function($scope, $stateParams, $rootScope, $state) {
        'use strict';

        /*$rootScope.loggedInStatus = false;
        $scope.$state = $state;
        if ($rootScope.loggedinUser) {
            $rootScope.loggedInStatus = true;
        }

        $scope.isCollapsed = true;
        $scope.isSBCollapsed = true;
        $scope.$on('$stateChangeSuccess', function() {
            $scope.isCollapsed = true;
            $scope.isSBCollapsed = true;
        });*/
        $scope.words = [{
            text: "Lorem",
            weight: 13
        }, {
            text: "Ipsum",
            weight: 10.5
        }, {
            text: "Dolor",
            weight: 9.4
        }, {
            text: "Sit",
            weight: 8
        }, {
            text: "Amet",
            weight: 6.2
        }, {
            text: "Consectetur",
            weight: 5
        }, {
            text: "Adipiscing",
            weight: 5
        }, ];
    }
]);
