/* 
 * @Author: pranam
 * @Date:   2015-03-15 00:26:28
 * @Last Modified by:   pranam
 * @Last Modified time: 2016-01-03 20:50:47
 */

/* Modal controller for confirmation of delete and archive users */
commonModule.controller('ConfirmModalCtrl', ['$scope', '$uibModalInstance', 'modalHeader', 'modalMessage',
    function($scope, $uibModalInstance, modalHeader, modalMessage) {
        'use strict';
        $scope.modalHeader = modalHeader;
        $scope.modalMessage = modalMessage;

        $scope.ok = function() {
            $uibModalInstance.close('ok');
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
]);
