var ozApp = angular.module('ozApp', ['ngRoute']);

ozApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/article', {
        templateUrl:'partials/articles.html'
    }).otherwise({
        redirectTo: '/article'
    });
}]);