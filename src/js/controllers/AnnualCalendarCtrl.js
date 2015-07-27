chartsApp.controller('AnnualCalendarCtrl',['$scope','$http',function($scope,$http){
  $scope.today = new Date(Date.now());
  $scope.lastYear = addDays(today,-365);
  var todayJSON = $scope.today.toJSONLocal();
  var lastYearJSON = $scope.lastYear.toJSONLocal();

  todayUTC = makeUTCDate(todayJSON);
  todayJSON = todayUTC.toJSONLocal() + "T23:59:59";

  var update = function(url){
    $http.get(url).success(function(response){
      $scope.annualCalendar = {
          data: response
      };
    });
  };

  update('functions.php?content=pillarsLog&startDay='+ lastYearJSON +'&endDay='+todayJSON+'T23%3A59%3A59');

}]);
