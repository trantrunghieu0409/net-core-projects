app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        template: '<p>Nothing here yet!</p>'
    })
    .when('/shopping', {
        templateUrl: 'shopping/shopping.template.html',
        controller: 'shoppingCtrl'
    })
    .otherwise('/');
});