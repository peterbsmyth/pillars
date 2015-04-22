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

Date.prototype.toHoursDotMinutes = function(){
  var minutes = this.getMinutes()/60;
  var hours = this.getHours();
  return hours+minutes;
}
