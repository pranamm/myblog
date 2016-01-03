profileModule.factory('ProfileService', ['$http', '$q', '$rootScope',
    function($http, $q, $rootScope) {
        'use strict';
        var profileService = {};

        profileService.getProfile = function() {
            var deferred = $q.defer();

            $http.get('/api/profile').then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        profileService.updateProfile = function(userId, profile) {
            var deferred = $q.defer();

            $http.put('/api/profile/' + userId, profile).then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        profileService.updatePassword = function(userId, profilePass) {
            var deferred = $q.defer();

            $http.put('/api/updatePass/' + userId, profilePass).then(function(res) {
                var data = res.data;
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return profileService;
    }
]);
