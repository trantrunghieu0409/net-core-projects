angular.module(MODULE_NAME).controller("chartCtrl", function($scope, $http) {
    $scope.chartTypes = [{index: 0, title:"Line Chart"}, {index: 1, title: "Pie Chart"}];
    $scope.selectedChart = $scope.chartTypes[0];

    // LINE CHART
    var dataLineChartUrl = "chart/line-chart/data.json";

    $http.get(dataLineChartUrl)
        .then(function(response) {
            $scope.lineChartData = response.data;
            
            $scope.lineChartYData=$scope.lineChartData.yData
            $scope.lineChartXData=$scope.lineChartData.xData
        });
    

    // PIE CHART
});