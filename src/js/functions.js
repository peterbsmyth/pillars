function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
} // From: http://stackoverflow.com/questions/19491336/get-url-parameter-jquery

//Candidate for improvement, add to Date.prototype
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
} // From: http://stackoverflow.com/questions/563406/add-days-to-datetime

Date.prototype.toJSONLocal = function() {
  function addZ(n) {
    return (n<10? '0' : '') + n;
  }
  return this.getFullYear() + '-' +
         addZ(this.getMonth() + 1) + '-' +
         addZ(this.getDate());
}; // From : http://stackoverflow.com/questions/11382606/javascript-date-tojson-dont-get-the-timezone-offset

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});// From: http://stackoverflow.com/questions/6982692/html5-input-type-date-default-value-to-today

Date.prototype.toDatetimeInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,19);
});

Date.prototype.toHoursDotMinutes = function(){
  var minutes = this.getMinutes()/60;
  var hours = this.getHours();
  return hours+minutes;
};

Date.prototype.toDurationFormat = function(){
  var hours = this.getHours();
  var minutes = this.getMinutes();
  return hours + ":" + minutes;
};

Date.prototype.toChartDurationFormat = function(){
  var hours = this.getHours();
  var minutes = this.getMinutes();
  return hours + " Hrs" + " " + minutes + " Mins";
};

//Candidate for improvement, add to Date.prototype
var makeUTCDate = function(dateString){
  var d = new Date(dateString);
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),  d.getUTCHours(), d.getUTCMinutes());
};

Date.prototype.addMinutes = function(minutes){
  return new Date(this.getTime() + minutes*60000);
};

//Candidate for improvement, add to String.prototype
var durationToMinutes = function(duration){
  var hours = parseInt(duration.substr(0,2),10) * 60;
  var minutes = parseInt(duration.substr(3,2),10);
  return hours + minutes;
};

var datetimeFormat = function(datetimestring){
  //Expects string formatted "YYYY-MM-DDTHH:MM:SS"
  var x = datetimestring;
  var y, mm, dd, yyyy, hh, mi;
  y= x.substr(5,2) + "/" + x.substr(8,2) + "/" + x.substr(0,4) + " ";
  hh = parseInt(x.substr(11,2),10);
  mi = x.substr(14,2);
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

var startFormat = function(x){
  //Expects string formatted "YYYY-MM-DD HH:mm:SS"
  //Returns HH:mm AM/PM
  var hh = parseInt(x.substr(11,2),10);
  var mm = x.substr(14,2);
  var final;
  if (hh > 12){
    hh -= 12;
    final = hh + ":" + mm + " PM";
    return final;
  }
  else if (hh === 0) {
    final = 12 + ":" + mm + " AM";
    return final;
  }
  else if (hh === 12) {
    final = hh + ":" + mi + " PM";
    return final;
  }
  else{
    final = hh + ":" + mm + " AM";
    return final;
  }
};

var durationFormat = function(x){
  //Expects string formatted "HH:mm:SS"
  var hh = x.substr(0,2);
  var mm = x.substr(3,2);

  if(parseInt(hh,10) === 0){
    return mm + "mins";
  }

  return hh + " Hrs, " + mm + " Mins";
};

String.prototype.toDateFormat = function(){
  //Expects string formatted "YYYY-MM-DD"
  return this.substr(5,2) + "/" + this.substr(8,2) + "/" + this.substr(0,4);
};
