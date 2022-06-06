angular.module(MODULE_NAME).controller("shoppingCtrl", function($scope, $http) {
    var url = './shopping/data.json';
    $http.get(url).then(function(response) {
        $scope.shopping_items = response.data;
    })    

    $scope.addItem = function() {
        $scope.error_text = "";
        if ($scope.newItem && !$scope.shopping_items.some(e=> e.name == $scope.newItem)) {
            var item = {
                name: $scope.newItem,
                isComplete: false,
                editingItem: false
            }
            $scope.shopping_items.push(item);
            $scope.newItem = ""; // reset input to blank 
        }
        else {
            $scope.error_text = "New item should not be duplicate or empty";
        }
    }

    $scope.removeItem = function(x) {
        if (x >= 0) {
            $scope.error_text = "";
            $scope.shopping_items.splice(x, 1);
        }
    }

    $scope.editItem = function(index) {
        $scope.shopping_items[index].editingItem = true;
    }
    $scope.editItemComplete = function(index) {
        $scope.shopping_items[index].editingItem = false;
    }

    $scope.onDragSuccess = function(data, event) {
        var index = $scope.shopping_items.findIndex(element => element.name == data().name);
        $scope.removeItem(index);
    }
});