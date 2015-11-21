chartsApp.controller('DataExplorerCtrl',['$scope','$http',function($scope,$http){
  $scope.formData = {};

  $scope.formSubmit = function (){
    var formClone = angular.copy($scope.formData);

    console.log('submitting...');
    $http({
      method: 'GET',
      url: '/api/query',
      params: formClone
    }).success(function(response){

      console.log(response);

      $scope.success = {
        data: response
      };
      // $scope.stats = {
      //   data: response.stats.total_duration
      // };
    });
  };
}]);
