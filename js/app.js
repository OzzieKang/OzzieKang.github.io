var ozApp = angular.module('ozApp', ['ngRoute']);

ozApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/article', {
        templateUrl: 'templateUrl/articles.html'
    }).otherwise({
        redirectTo: '/article'
    });

    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true
    });
}]);