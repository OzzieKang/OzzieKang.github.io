var ozApp = angular.module('ozApp', ['ngRoute']);

ozApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {
        templateUrl: '/partials/home.html'
    }).when('/articles', {
        templateUrl: '/partials/articles.html'
    }).when('/programing', {
        templateUrl: '/partials/programing.html'
    }).when('/tips', {
        templateUrl: '/partials/tips.html'
    }).otherwise({
        redirectTo: '/'
    });

    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true
    });
}]);