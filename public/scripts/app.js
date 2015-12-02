/* 
 * @Author: pranam
 * @Date:   2014-12-19 23:39:43
 * @Last Modified by:   pranam
 * @Last Modified time: 2015-01-20 10:58:12
 */

'use strict';
var app = angular.module('app', ['ui.bootstrap', 'ngRoute']);


app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.otherwise('home');

        $routeProvider.when("/home/", {
            templateUrl: '/views/post/home.html',
            controller: 'HomeCtrl'
        })

        .when("/admin", {
            templateUrl: '/views/admin/admin.html',
            controller: 'AdminCtrl'
        })

        .when("/admin/posts", {
            templateUrl: '/views/post/posts.html',
            controller: 'PostsCtrl'
        })

        .when("/admin/posts/create", {
            templateUrl: '/views/post/create-post.html',
            controller: 'CreatePostCtrl'
        })

        .when("admin/profile", {
            templateUrl: '/views/profile/profile.html',
            controller: 'ProfileCtrl'
        })

        /*$locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');*/

        $locationProvider.html5Mode(false);

        /*Users Routes*/
        /*.state('home.users', {
            url: '',
            abstract: true,
            templateUrl: '../warehouse/views/users/users.html',
            data: {
                authorizedRoles: [USER_ROLES.admin]
            }
        })*/
    }
]);
