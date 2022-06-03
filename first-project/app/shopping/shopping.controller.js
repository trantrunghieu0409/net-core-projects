app.controller("shoppingCtrl", function($scope, $http) {
    var url = './shopping/data.json';
    $http.get(url).then(function(response) {
        $scope.shopping_items = response.data;
    })    

    $scope.addItem = function() {
        $scope.error_text = "";
        if ($scope.newItem && !$scope.shopping_items.includes($scope.newItem)) {
            $scope.shopping_items.push($scope.newItem);
            $scope.newItem = ""; // reset input to blank 
        }
        else {
            $scope.error_text = "New item should not be duplicate or empty";
        }
    }

    $scope.removeItem = function(x) {
        $scope.error_text = "";
        $scope.shopping_items.splice(x, 1);
    }
});