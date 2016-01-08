profileModule.factory('ProfileService', ['$http', '$q',
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

        return profileService;
    }
]);
