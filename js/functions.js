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
} // From : http://stackoverflow.com/questions/11382606/javascript-date-tojson-dont-get-the-timezone-offset

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
}

var makeUTCDate = function(dateString){
  var d = new Date(dateString);
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),  d.getUTCHours(), d.getUTCMinutes());
}

var addMinutes = function(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

var durationToMinutes = function(duration){
  var hours = parseInt(duration.substr(0,2),10) * 60;
  var minutes = parseInt(duration.substr(3,2),10);
  return hours + minutes;
