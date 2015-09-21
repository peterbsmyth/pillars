// define Angular controller with name ActivityCtrl
// and inject $scope, $http and apiService
chartsApp.controller('ActivityCtrl',['$scope','$http','apiService',
function($scope,$http,apiService){

  //initial scope.today to current date
  $scope.today = new Date(Date.now());

  //parse todays date into string
  var todayJSON = $scope.today.toJSONLocal();

  // define private update method using apiService factory to make an API call
  // and store response to scope
  function update(day){
    apiService.day(day).then(function(response){
      $scope.activity = { data: response.data };
    });
  }

  // define public method to to parse $scope.today into a string then pass
  // that string to update function
  $scope.newDay = function(){
    todayJSON = $scope.today.toJSONLocal();
    update(todayJSON);
  };

  //inital call Initialize scope.activity.data with current date's data
  update(todayJSON);




}]);
