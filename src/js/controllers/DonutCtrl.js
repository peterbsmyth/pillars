chartsApp.controller('DonutCtrl',['$scope','$http',function($scope,$http){
  $scope.today = new Date(Date.now());
  var todayJSON = $scope.today.toJSONLocal();

  $scope.donut = {
    data: [
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
    ]
  };

  $http.get('functions.php?content=dayCumulativeDuration&startDay='+todayJSON+'&endDay='+todayJSON+'T23%3A59%3A59').success(function(response){
    $scope.donut = {
      data: response
    };
  });

  $scope.update = function(){
    todayJSON = $scope.today.toJSONLocal();
    $http.get('functions.php?content=dayCumulativeDuration&startDay='+todayJSON+'&endDay='+todayJSON+'T23%3A59%3A59').success(function(response){
      $scope.donut = {
        data: response
      };
    });
  };
}]);
