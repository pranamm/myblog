'use strict';
var app = angular.module('app', [
    'ngSanitize',
    'ui.bootstrap',
    'ui.bootstrap.showErrors',
    'ui.router',
    'ngTagsInput',
    'gist',
    'summernote',

    'app.common',
    'app.posts',
    'app.profile'
]);

var commonModule = angular.module('app.common', []),
    postsModule = angular.module('app.posts', []),
    profileModule = angular.module('app.profile', []);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'showErrorsConfigProvider', 'USER_ROLES',
    function($stateProvider, $urlRouterProvider, $httpProvider, showErrorsConfigProvider, USER_ROLES) {
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
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ALL]
            }
        })



        .state("home", {
            url: "/home",
            abstract: true,
            templateUrl: '../admin/views/home.html',
            controller: 'HomeCtrl',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ADMIN]
            }
        })

        .state('home.dashboard', {
            url: '',
            abstract: true,
            templateUrl: '../admin/views/dashboard/dashboard.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ADMIN]
            }
        })

        .state('home.dashboard.list', {
            url: '',
            templateUrl: '../admin/views/dashboard/dashboard-list.html',
            controller: 'HomeCtrl',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ADMIN]
            }
        })

        /*Posts Routes*/
        .state('home.posts', {
            url: '/posts',
            abstract: true,
            templateUrl: '../admin/views/posts/posts.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ADMIN]
            }
        })

        .state('home.posts.list', {
            url: '',
            controller: "PostsCtrl",
            templateUrl: '../admin/views/posts/posts-list.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ADMIN]
            }
        })

        .state('home.posts.draft', {
            url: '/draft-post',
            controller: "PostsCtrl",
            templateUrl: '../admin/views/posts/post-draft.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ADMIN]
            }
        })

        .state('home.posts.edit', {
            url: '/edit-post/:postId',
            controller: "PostsCtrl",
            templateUrl: '../admin/views/posts/post-draft.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ADMIN]
            }
        })

        /*Posts Routes*/
        .state('home.images', {
            url: '/images',
            abstract: true,
            templateUrl: '../admin/views/post-images/post-images.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ADMIN]
            }
        })

        .state('home.images.list', {
            url: '',
            controller: "PostImagesCtrl",
            templateUrl: '../admin/views/post-images/post-images-list.html',
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ADMIN]
            }
        })

        .state('home.profile', {
            url: '/profile',
            templateUrl: '../admin/views/profile/profile.html',
            controller: "ProfileCtrl",
            resolve: {
                loggedinUser: checkLoggedin
            },
            data: {
                authRoles: [USER_ROLES.ADMIN]
            }
        })

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
