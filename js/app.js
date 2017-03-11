var ozApp = angular.module('ozApp', ['ngRoute']);

ozApp.config(['$routeProvider',  function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'partials/home.html'
    }).when('/articles', {
        templateUrl: 'partials/articles.html'
    }).when('/programing', {
        templateUrl: 'partials/programing.html'
    }).when('/tips', {
        templateUrl: 'partials/tips.html',
        controller: 'TipsCtrl'
    }).otherwise({
        redirectTo: '/home'
    });

    // use the HTML5 History API
    //$locationProvider.html5Mode({
    //    enabled: true
    //});
}]);