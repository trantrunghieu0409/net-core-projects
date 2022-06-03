app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        template: '<p>Choose an app above to start demo</p>'
    })
    .when('/shopping', {
        templateUrl: 'shopping/shopping.template.html',
        controller: 'shoppingCtrl'
    })
    .otherwise('/');
});