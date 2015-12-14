commonModule.controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'AuthService', 'AUTH_EVENTS',
    function($scope, $location, $rootScope, AuthService, AUTH_EVENTS) {
        'use strict';

        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.login = function(credentials) {
            $scope.$broadcast('show-errors-check-validity');

            if ($scope.loginForm.$valid) {
                AuthService.login(credentials).then(function(user) {
                    $rootScope.loggedinUser = user;
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                }, function(err) {
                    $rootScope.loggedinUser = null;
                    $scope.credentials.password = '';
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, err.data);
                });
            }
        };

        $scope.resetNotification = function() {
            $rootScope.$broadcast("hideNotification");
        };
    }
]);
