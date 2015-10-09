var chartsServices = angular.module('chartsApp.services',[])
.factory('apiService',['$http',function($http){

  function getPillars(startDay,endDay){

    return $http.get('/api/log/' + startDay + '/' + endDay + "T23%3A59%3A59");
  }

  function getCumulative(startDay,endDay){
    var url = 'api/log/cumulative';

    return $http.get('/api/log/cumulative/' + startDay + '/' + endDay + "T23%3A59%3A59");
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
