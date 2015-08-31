

angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', { templateUrl: '/partials/main', controller: 'mainCtrl'});
    console.log("app.js angular config end.");

});

angular.module('app').controller('mainCtrl', function($scope) {
    console.log("app.js controller declare.");
    $scope.myVar = "Hello Angular";
});