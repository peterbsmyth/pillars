chartsApp.controller('DataExplorerCtrl',['$scope','$http',function($scope,$http){
  $scope.formData = {};

  $scope.formSubmit = function (){
    var formClone = angular.copy($scope.formData);

    formClone.startDate = (JSON.stringify(formClone.startDate)).substr(1,10);

    formClone.endDate = (JSON.stringify(formClone.endDate)).substr(1,10);

    console.log('submitting...');
    $http({
      method: 'POST',
      url: 'angular_functions.php',
      data: formClone,
      headers: {'Content-type' : 'application/x-www-form-urlencoded'}
    }).success(function(response){
      $scope.success = {
        data: response.data.entries
      };
      $scope.stats = {
        data: response.stats.total_duration
      };
    });
  };
}]);
