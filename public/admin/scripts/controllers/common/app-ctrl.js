commonModule.controller('AppCtrl', ['$scope', '$location', '$rootScope', '$timeout', 'USER_ROLES', 'AuthService', 'AUTH_EVENTS',
    function($scope, $location, $rootScope, $timeout, USER_ROLES, AuthService, AUTH_EVENTS) {
        'use strict';

        $rootScope.loggedInStatus = false;

        $rootScope.notification = "";
        $rootScope.notificationType = "";
        $rootScope.notificationHidden = "hidden";

        $scope.logout = function() {
            AuthService.logout().then(function(user) {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            }, function() {
                $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
            });
        };

        $scope.$on(AUTH_EVENTS.loginSuccess, function(event) {
            $rootScope.loggedInStatus = true;
            if ($location.url() === "/login") {
                $location.path('/home');
            }
        });

        $scope.$on(AUTH_EVENTS.notAuthenticated, function(event, msg) {
            $rootScope.loggedInStatus = false;
            $location.path('/login');
            $rootScope.$broadcast('notification', {
                message: msg,
                type: "danger"
            }, false);
        });

        $scope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
            $rootScope.loggedInStatus = false;
            $location.path('/login');
        });

        $scope.$on(AUTH_EVENTS.logoutFailed, function(event) {

        });

        $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
            $location.path('/home');
        });

        $scope.$on("notification", function(event, data, timeoutNeeded) {
            $rootScope.notification = data.message;
            $rootScope.notificationType = data.type;
            $rootScope.notificationHidden = "";
            if (timeoutNeeded) {
                $timeout(function() {
                    $rootScope.notification = "";
                    $rootScope.notificationType = "";
                    $rootScope.notificationHidden = "hidden";
                }, 5000);
            }

        });

        $scope.$on("hideNotification", function(event) {
            $rootScope.notification = "";
            $rootScope.notificationType = "";
            $rootScope.notificationHidden = "hidden";
        });
    }
]);
