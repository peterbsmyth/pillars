chartsApp.controller('ActivityCtrl',['$scope','$http','apiService',function($scope,$http,apiService){
  $scope.today = new Date(Date.now());
  var todayJSON = $scope.today.toJSONLocal();

  function update(day){
    apiService.day(day).success(function(response){
      $scope.activity = { data: response };
    });
  }

  update(todayJSON);

  $scope.newDay = function(){
    todayJSON = $scope.today.toJSONLocal();
    update(todayJSON);
  };


}]);
