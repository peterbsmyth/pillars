chartsApp.directive('select',function(){
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
