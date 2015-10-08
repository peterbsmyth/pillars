chartsApp.controller('DonutCtrl',['$scope','$http','apiService',function($scope,$http,apiService){
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

  function update(day){
      apiService.cumulativeDay(day).then(function(response){
        $scope.donut = {
          data: response.data
        };
      });
  }

  update(todayJSON);



  $scope.newDay = function(){
    todayJSON = $scope.today.toJSONLocal();
    update(todayJSON);
  };
}]);
