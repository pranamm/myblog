commonModule.factory('AuthService', ['$http', '$q', '$location', '$rootScope', '$state',
    function($http, $q, $location, $rootScope, $state) {
        'use strict';
        var authService = {};

        authService.login = function(credentials) {
            var deferred = $q.defer();

            $http.post('/api/login', credentials).then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        authService.logout = function() {
            return $http.get('/api/logout').then(function(res) {
                $rootScope.loggedinUser = null;
                var data = res.data;
                return data;
            });
        };

        authService.checkLoggedin = function() {
            var deferred = $q.defer();

            $http.get('/api/loggedin').success(function(user) {
                if (user !== '0') {
                    if ($location.path() === "/login") {
                        $location.url('/home');
                    } else {
                        if ($rootScope.authRoles.indexOf('all') != 'all') {
                            if ($rootScope.authRoles.indexOf(user.role) == -1) {
                                $location.url('/home');
                            } else {
                                $rootScope.loggedinUser = user;
                                deferred.resolve(user);
                            }
                        }
                    }
                } else {
                    if ($location.path() === "/login") {
                        deferred.resolve(true);
                    } else {
                        $rootScope.message = 'You need to log in.';
                        $rootScope.loggedinUser = null;
                        $location.url('/login');
                        deferred.reject();
                    }
                }
            });

            return deferred.promise;
        };

        $rootScope.$on('$stateChangeStart', function(event, authStates) {
            $rootScope.authRoles = authStates.data.authRoles;
        });

        return authService;
    }
]);
