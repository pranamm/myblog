profileModule.controller('ProfileCtrl', ['$scope', '$stateParams', '$rootScope', '$state', 'ProfileService',
    function($scope, $stateParams, $rootScope, $state, ProfileService) {
        'use strict';

        $scope.editMode = false;

        //getProfile();

        (function getProfile() {
            var skillSet = [];
            ProfileService.getProfile().then(function(res) {
                if (res.data.skillSet) {
                    res.data.skillSet.forEach(function(item, idx) {
                        item = {
                            "text": item
                        };
                        skillSet.push(item);
                    });

                    $scope.skillSet = skillSet;
                }
                $scope.profile = res.data;
            }, function(err) {
                deferred.reject(err);
            });
        })();

        $scope.toggleEditMode = function() {
            $scope.editMode = !$scope.editMode;
        };

        $scope.updateProfile = function() {
            var skillSet = [];

            $scope.skillSet.forEach(function(item, idx) {
                skillSet.push(item.text);
            });

            if ($scope.editProfileForm.$valid) {
                $scope.profile.skillSet = skillSet;

                ProfileService.updateProfile($scope.profile._id, $scope.profile).then(function(response) {
                    $rootScope.$broadcast('notification', {
                        message: response.message,
                        type: "success"
                    }, true);
                }, function() {
                    $rootScope.$broadcast('notification', {
                        message: "Error editing profile",
                        type: "danger"
                    }, true);
                });
            }
        };

        $scope.updateProfilePassword = function() {
            $scope.$broadcast('show-errors-check-validity');

            if ($scope.editProfilePasswordForm.$valid) {
                delete $scope.profilePass.confirmPassword
                ProfileService.updatePassword($scope.profile._id, $scope.profilePass).then(function(response) {
                    $rootScope.$broadcast('notification', {
                        message: response.message,
                        type: "success"
                    }, true);
                }, function() {
                    $rootScope.$broadcast('notification', {
                        message: "Error updating password",
                        type: "danger"
                    }, true);
                });
            }
        }

        $scope.validatePassword = function() {
            if ($scope.profilePass.newPassword === $scope.profilePass.confirmPassword) {
                $scope.editProfilePasswordForm.confirmPassword.$setValidity('password', true);
                $scope.editProfilePasswordForm.newPassword.$setValidity('password', true);
                $scope.passwordValidMsg = "";
            } else {
                $scope.editProfilePasswordForm.confirmPassword.$setValidity('password', false);
                $scope.editProfilePasswordForm.newPassword.$setValidity('password', false);
                $scope.passwordValidMsg = "New Password and Confirm New password should be same";
            }
        };
    }
]);
