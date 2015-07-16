chartsApp.controller('ActivityCtrl',['$scope','$http',function($scope,$http){
  $scope.today = new Date(Date.now());
  var todayJSON = $scope.today.toJSONLocal();

  var update = function(url){
    $http.get(url).success(function(response){
      $scope.activityData = response;
    });
  };

  update('functions.php?content=pillarsLog&startDay='+ todayJSON +'&endDay='+todayJSON+'T23%3A59%3A59');

  $scope.newDay = function(){
    todayJSON = $scope.today.toJSONLocal();
    update('http://localhost/pillars/dev/functions.php?content=pillarsLog&startDay='+todayJSON+'&endDay='+todayJSON+'T23%3A59%3A59');
  };


}]);
