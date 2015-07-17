chartsApp.controller('StackedCtrl',['$scope','$http',function($scope,$http){
  $scope.today = new Date(Date.now());
  $scope.today.setDate($scope.today.getDate() - 6);
  var prevWeekJSON = $scope.today.toJSONLocal();

  var endDayJSON = makeUTCDate(prevWeekJSON);
  endDayJSON = addDays(endDayJSON,6).toJSONLocal() + "T23:59:59";

  $http.get('functions.php?content=pillarsLog&startDay='+prevWeekJSON+'&endDay='+endDayJSON).success(function(response){
    $scope.stacked = {
      data: response
    };
  });

  $scope.update = function(){
    prevWeekJSON = $scope.today.toJSONLocal();
    var endDayJSON = makeUTCDate(prevWeekJSON);
    endDayJSON = addDays(endDayJSON,6).toJSONLocal() + "T23:59:59";
    $http.get('functions.php?content=pillarsLog&startDay='+prevWeekJSON+'&endDay='+endDayJSON).success(function(response){
      $scope.stacked = {
        data: response
      };
    });
  };
}]);
