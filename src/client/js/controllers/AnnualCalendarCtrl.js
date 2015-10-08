chartsApp.controller('AnnualCalendarCtrl',['$scope','$http','apiService',function($scope,$http,apiService){
  $scope.today = new Date(Date.now());
  $scope.lastYear = addDays(today,-365);
  var todayJSON = $scope.today.toJSONLocal();
  var lastYearJSON = $scope.lastYear.toJSONLocal();

  todayUTC = makeUTCDate(todayJSON);
  todayJSON = todayUTC.toJSONLocal();

  apiService.dates(lastYearJSON,todayJSON).then(function(response){
    $scope.annualCalendar = {
      data: response.data
    };
  });

}]);
