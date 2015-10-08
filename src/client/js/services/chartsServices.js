var chartsServices = angular.module('chartsApp.services',[])
.factory('apiService',['$http',function($http){

  function getPillars(startDay,endDay){

    var url = 'functions.php';

    return $http({
      method: 'GET',
      url: url,
      params: {
        "content": "pillarsLog",
        "startDay": startDay,
        "endDay": endDay + "T23%3A59%3A59"
      }
    });
  }

  function getCumulative(startDay,endDay){
    var url = 'functions.php';

    return $http({
      method: 'GET',
      url: url,
      params: {
        "content": "dayCumulativeDuration",
        "startDay": startDay,
        "endDay": endDay + "T23%3A59%3A59"
      }
    });
  }

  return {
    day: function (day){
      return getPillars(day,day);
    },
    dates: function(startDay,endDay){
      return getPillars(startDay,endDay);
    },
    cumulativeDay: function(day){
      return getCumulative(day,day);
    }
  };

}]);
