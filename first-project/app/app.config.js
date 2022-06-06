angular.module(MODULE_NAME).config(['$routeProvider',
    function config($routeProvider) {
    $routeProvider
    .when('/', {
        template: '<p>Nothing here yet!</p>'
    })
    .when('/shopping', {
        templateUrl: 'shopping/shopping.template.html',
        controller: 'shoppingCtrl'
    })
    .when('/chart', {
        templateUrl: 'chart/chart.template.html',
   //     controller: 'chartCtrl'
    })
    .otherwise('/');
}]);