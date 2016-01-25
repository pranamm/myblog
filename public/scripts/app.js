'use strict';
var app = angular.module('app', [
    //'ngSanitize',
    'ui.bootstrap',
    'ui.router',
    'gist',
    'angular-jqcloud',

    'app.common',
    'app.posts',
    'app.profile'
]);

var commonModule = angular.module('app.common', []),
    postsModule = angular.module('app.posts', []),
    profileModule = angular.module('app.profile', []);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/home');

        $stateProvider.state("home", {
            url: "/",
            abstract: true,
            templateUrl: '../views/home.html',
            //controller: 'HomeCtrl'
        })

        $stateProvider.state("home.posts", {
            url: "/home",
            templateUrl: '../views/posts/post-home.html',
            controller: 'HomeCtrl'
        })

        $stateProvider.state("post", {
            url: "/:permalink",
            templateUrl: '../views/posts/post.html',
            controller: 'PostsCtrl'
        })

        $stateProvider.state("tags", {
            url: "/tags/:tagName",
            templateUrl: '../views/posts/post-tags.html',
            controller: 'PostsCtrl'
        }) 
    }
]);
