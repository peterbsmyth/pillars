var dataApp = angular.module('dataApp',['dataAppFilters']);

dataApp.controller('DataCtrl',['$scope','$http',function($scope,$http){
  $scope.formData = {};

  $scope.formSubmit = function (){
    var formClone = angular.copy($scope.formData);

    formClone.startDate = (JSON.stringify(formClone.startDate)).substr(1,10);

    formClone.endDate = (JSON.stringify(formClone.endDate)).substr(1,10);

    console.log('submitting...');
    $http({
      method: 'POST',
      url: 'angular_functions.php',
      data: formClone,
      headers: {'Content-type' : 'application/x-www-form-urlencoded'}
    }).success(function(response){
      $scope.success = response.data;
      $scope.stats = response.stats.total_duration;
    });
  };
}]);

var HHMM_REGEXP = /^[0-9]{2}:[0-9]{2}$/;
dataApp.directive('hhmm',function(){
  return {
    require: 'ngModel',
    link: function(scope,element,attrs,ctrl){
      ctrl.$validators.hhmm = function(modelValue,viewValue){
        if (ctrl.$isEmpty(modelValue)) {
          return true;
        }

        if (HHMM_REGEXP.test(viewValue)) {
          return true;
        }

        return false;
      };
    }
  };
});

dataApp.directive('select',function(){
  return {
    require: 'ngModel',
    link: function(scope,element,attrs,ctrl){
      ctrl.$validators.select = function(modelValue,viewValue){
        if (ctrl.$isEmpty(modelValue)) {
          return false;
        }

        return true;
      };
    }
  };
});

angular.module('dataAppFilters',[]).filter('datetime',function(){
  return function(value){
    //Expects string formatted "YYYY-MM-DDTHH:MM:SS"
    var y, mm, dd, yyyy, hh, mi;
    y= value.substr(5,2) + "/" + value.substr(8,2) + "/" + value.substr(0,4) + " ";
    hh = parseInt(value.substr(11,2),10);
    mi = value.substr(14,2);
    if (hh > 12){
      hh -= 12;
      y += hh + ":" + mi + " PM";
      return y;
    }
    else if (hh === 0){
      y += 12 + ":" + mi + " AM";
      return y;
    }
    else if (hh === 12){
      y += hh + ":" + mi + " PM";
      return y;
    }
    else {
      y += hh + ":" + mi + " AM";
      return y;
    }
  };
});
