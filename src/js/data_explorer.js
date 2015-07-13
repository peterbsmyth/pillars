var dataApp = angular.module('dataApp',[]);

dataApp.controller('DataCtrl',['$scope','$http',function($scope,$http){
  $scope.formData = {};

  $scope.formSubmit = function (){
    var formClone = JSON.parse(JSON.stringify($scope.formData));

    formClone.startDate = (JSON.stringify(formClone.startDate)).substr(1,10);

    formClone.endDate = (JSON.stringify(formClone.endDate)).substr(1,10);

    console.log('submitting...');
    $http({
      method: 'POST',
      url: 'angular_functions.php',
      data: formClone,
      headers: {'Content-type' : 'application/x-www-form-urlencoded'}
    }).success(function(data){
      $scope.success = data;
    });
  };
}]);
