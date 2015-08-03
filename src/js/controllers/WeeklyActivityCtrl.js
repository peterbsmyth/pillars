chartsApp.controller('WeeklyActivityCtrl',['$scope','$http','apiService',function($scope,$http,apiService){
  $scope.today = new Date(Date.now());
  $scope.today.setDate($scope.today.getDate() - 6);
  var prevWeekJSON = $scope.today.toJSONLocal();

  var endDayJSON = makeUTCDate(prevWeekJSON);
  endDayJSON = addDays(endDayJSON,6).toJSONLocal();

  var update = function(startDate,endDate){
    apiService.dates(startDate,endDate).then(function(response){
      $scope.weeklyActivity = { data: response.data };
    });
  };



  update(prevWeekJSON,endDayJSON);

  $scope.newDay = function(){
    prevWeekJSON = $scope.today.toJSONLocal();
    var endDayJSON = makeUTCDate(prevWeekJSON);
    endDayJSON = addDays(endDayJSON,6).toJSONLocal();
    update(prevWeekJSON,endDayJSON);
  };


}]);
