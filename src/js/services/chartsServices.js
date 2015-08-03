var chartsServices = angular.module('chartsApp.services',[])
.factory('apiService',['$http',function($http){

  function getPillars(startDay,endDay){

    var url = 'functions.php?content=pillarsLog&startDay='+startDay+'&endDay='+endDay+'T23%3A59%3A59';

    return $http.get(url);
  }

  function getCumulative(startDay,endDay){
    var url = 'functions.php?content=dayCumulativeDuration&startDay='+startDay+'&endDay='+endDay+'T23%3A59%3A59';

    return $http.get(url);
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
