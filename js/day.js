$("body").on("change", "#datePicker", function(){
  //update Table
  console.log("Updating Table...");
  var selectedDate = $(this).val();
  buildTable(selectedDate);
});


//add tablesorter to dayTable
$("#dayTable").tablesorter();

//Set Default Date to Today
$('#datePicker').val(new Date().toDateInputValue());

//Initialize Day Table with Today's Data
var startToday = new Date(Date.now()).toJSONLocal();
buildTable(startToday);

$("body").on("click","#add-entry",function(){
  var lastDatetime = $("#dayTable TBODY tr").last().children("td[class='datetime']").text();
  var lastDuration = $("#dayTable TBODY tr").last().children("td[class='duration']").text();
  var newDatetime = new Date(lastDatetime);

  newDatetime = addMinutes(newDatetime,durationToMinutes(lastDuration));

  $("#date").val(newDatetime.toDatetimeInputValue());
});
