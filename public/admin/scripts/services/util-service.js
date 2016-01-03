/* 
 * @Author: pranam
 * @Date:   2015-03-15 00:21:48
 * @Last Modified by:   pranam
 * @Last Modified time: 2016-01-04 00:09:40
 */

commonModule.factory('UtilService', ['$uibModal',
    function($uibModal) {
        'use strict';

        var utilService = {};

        utilService.showConfirmationBox = function(size, modalHeader, modalMessage, cb, args) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '../admin/views/common/confirm-modal.html',
                controller: 'ConfirmModalCtrl',
                size: size,
                backdrop: 'static',
                resolve: {
                    modalHeader: function() {
                        return modalHeader;
                    },
                    modalMessage: function() {
                        return modalMessage;
                    }
                }
            });

            modalInstance.result.then(function() {
                if (args)
                    cb(args);
                else
                    cb();
            }, function() {

            });
        };

        return utilService;
    }
]);
