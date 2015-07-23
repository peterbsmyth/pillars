chartsApp.controller('WeeklyActivityCtrl',['$scope','$http',function($scope,$http){
  $scope.today = new Date(Date.now());
  $scope.today.setDate($scope.today.getDate() - 6);
  var prevWeekJSON = $scope.today.toJSONLocal();

  var endDayJSON = makeUTCDate(prevWeekJSON);
  endDayJSON = addDays(endDayJSON,6).toJSONLocal() + "T23:59:59";

  var update = function(url){
    $http.get(url).success(function(response){
      $scope.weeklyActivity = {
          data: response
      };
    });
  };

  update('functions.php?content=pillarsLog&startDay='+ prevWeekJSON +'&endDay='+endDayJSON+'T23%3A59%3A59');

  $scope.newDay = function(){
    prevWeekJSON = $scope.today.toJSONLocal();
    var endDayJSON = makeUTCDate(prevWeekJSON);
    endDayJSON = addDays(endDayJSON,6).toJSONLocal() + "T23:59:59";
    update('functions.php?content=pillarsLog&startDay='+prevWeekJSON+'&endDay='+endDayJSON+'T23%3A59%3A59');
  };


}]);
