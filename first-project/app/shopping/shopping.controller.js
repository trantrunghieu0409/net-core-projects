app.controller("shoppingCtrl", function($scope, $http) {
    var url = './shopping/data.json';
    $http.get(url).then(function(response) {
        $scope.shopping_items = response.data;
    })    

    $scope.addItem = function() {
        $scope.error_text = "";
        if ($scope.newItem && !$scope.shopping_items.some(e=> e.name == $scope.newItem)) {
            var item = {
                name: $scope.newItem,
                isComplete: false
            }
            $scope.shopping_items.push(item);
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

    $scope.editingItem = false;
    $scope.editItem = function(index) {
        $scope.editingItem = true;
    }
    $scope.editItemComplete = function() {
        $scope.editingItem = false;
    }
});