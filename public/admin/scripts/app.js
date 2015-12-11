'use strict';
var app = angular.module('app', [
    'ui.bootstrap',
    'ui.bootstrap.showErrors',
    'ui.router',

    'app.common'
]);

var commonModule = angular.module('app.common', []);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'showErrorsConfigProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, showErrorsConfigProvider) {
        'use strict';

        showErrorsConfigProvider.showSuccess(true);
        $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
            return {
                response: function(response) {
                    // do something on success
                    return response;
                },
                responseError: function(response) {
                    if (response.status === 401)
                        $location.url('/login');
                    return $q.reject(response);
                }
            };
        }]);

        var checkLoggedin = ['AuthService', '$state', function(AuthService, $state) {
            return AuthService.checkLoggedin();
        }];

        $urlRouterProvider.otherwise('/login');

        $stateProvider.state("login", {
            url: "/login",
            templateUrl: '../admin/views/common/login.html',
            controller: 'LoginCtrl',
            /*resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ALL]
            }*/
        })

        /*.state("home", {
            url: "/home",
            abstract: true,
            templateUrl: '../warehouse/views/home.html',
            controller: 'HomeCtrl',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN]
            }
        })

        .state('home.dashboard', {
            url: '',
            abstract: true,
            templateUrl: '../warehouse/views/dashboard/dashboard.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN]
            }
        })

        .state('home.dashboard.list', {
            url: '',
            templateUrl: '../warehouse/views/dashboard/dashboard.list.html',
            controller: 'HomeCtrl',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN]
            }
        })*/

        /*Organizations Routes*/
        /*.state('home.organizations', {
            url: '/organizations',
            abstract: true,
            templateUrl: '../warehouse/views/organizations/organizations.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN]
            }
        })

        .state('home.organizations.list', {
            url: '',
            controller: "OrganizationCtrl",
            templateUrl: '../warehouse/views/organizations/organizations.list.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN]
            }
        })

        .state('home.organizations.create', {
            url: '/create',
            controller: 'CreateOrganizationCtrl',
            templateUrl: '../warehouse/views/organizations/organization.edit.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN]
            }
        })

        .state('home.organizations.edit', {
            url: '/edit/:orgId',
            controller: 'EditOrganizationCtrl',
            templateUrl: '../warehouse/views/organizations/organization.edit.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.SUPERADMIN, USER_ROLES.ADMIN]
            }
        })*/
    }
]);
