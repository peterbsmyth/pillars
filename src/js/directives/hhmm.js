chartsApp.directive('hhmm',function(){
  var HHMM_REGEXP = /^[0-9]{2}:[0-9]{2}$/;
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
