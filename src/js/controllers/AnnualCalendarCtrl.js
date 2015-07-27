chartsApp.controller('AnnualCalendarCtrl',['$scope','$http',function($scope,$http){
  $scope.today = new Date(Date.now());
  $scope.today = $scope.today.getDate();
}]);
