angular.module('chartsApp.filters',[]).filter('datetime',function(){
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
