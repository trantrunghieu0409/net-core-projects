mainApp.controller('studentController', function($scope) {
   $scope.student = {
      firstName: "Mahesh",
      lastName: "Parashar",
      money: 10000,
      subjects: [{name: "Math"}, {name: "Science"}, {name: "Art"}],
      //subjects: ["A", "B", "C"],
      fullName: function() {
         var studentObject;
         studentObject = $scope.student;
         return studentObject.firstName + " " + studentObject.lastName;
      }
   };
   $scope.reset = function() {
      $scope.student.firstName = "Mahesh";
      $scope.student.lastName = "Parashar";
   }   
   
   $scope.reset();
});