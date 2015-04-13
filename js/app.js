//Print rows to table 
var url = "functions.php";
var data = { grab: "journal" };
var data = {page : "day" };
$.getJSON(url,data,function(response){
  console.log(response);
  response.forEach(function(item){
    var row = $("<tr/>");
    $(row).append("<td>" + item.id + "</td>");
    $(row).append("<td>" + item.pillar + "</td>");
    $(row).append("<td>" + item.event_date + "</td>");
    $(row).append("<td>" + item.duration + "</td>");
    $(row).append("<td>" + item.quality + "</td>");
    $(row).append("<td>" + item.notes +  "</td>");
    $(row).append("<td>" + item.entry_utc_timestamp +  "</td>");
    $("#day").append(row);
  });
  $("#entryTable").tablesorter({debug:false}); 
});