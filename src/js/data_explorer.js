var dataApp = angular.module('dataApp',[]);

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
    }).success(function(data){
      $scope.success = data;
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
