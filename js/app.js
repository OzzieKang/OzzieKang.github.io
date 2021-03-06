﻿var ozApp = angular.module('ozApp', ['ngRoute']);

ozApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {
        templateUrl: '/partials/home.html'
    }).when('/articles', {
        templateUrl: '/partials/articles.html',
        controller: 'ArticalCtrl'
    }).when('/programing', {
        templateUrl: '/partials/programing.html',
        controller: 'ProgramCtrl'
    }).when('/toDo', {
        templateUrl: '/partials/todo.html',
        controller: 'ToDoCtrl'
    }).when('/tips', {
        templateUrl: '/partials/tips.html',
        controller: 'TipsCtrl'
    }).otherwise({
        redirectTo: '/'
    });

    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true
    });
}]);