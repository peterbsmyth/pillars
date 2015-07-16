chartsApp.controller('DonutCtrl',['$scope','$http',function($scope,$http){
  $scope.today = new Date(Date.now());
  var todayJSON = $scope.today.toJSONLocal();

  $scope.donutData = [
    {
        "pillar": "No Data",
        "duration": "1"
    },
    {
        "pillar": "NO DATA",
        "duration": "1"
    },
    {
        "pillar": "NO DATA",
        "duration": "1"
    },
    {
        "pillar": "NO DATA",
        "duration": "1"
    },
    {
        "pillar": "NO DATA",
        "duration": "1"
    },
    {
        "pillar": "NO DATA",
        "duration": "1"
    },
    {
        "pillar": "NO DATA",
        "duration": "1"
    }
];

  $http.get('functions.php?content=dayCumulativeDuration&startDay='+todayJSON+'&endDay='+todayJSON+'T23%3A59%3A59').success(function(data){
    $scope.donutData = data;
  });

  $scope.update = function(){
    todayJSON = $scope.today.toJSONLocal();
    $http.get('functions.php?content=dayCumulativeDuration&startDay='+todayJSON+'&endDay='+todayJSON+'T23%3A59%3A59').success(function(data){
      $scope.donutData = data;
    });
  };
}]);
