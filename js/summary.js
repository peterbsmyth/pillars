$("body").on("click", "#go", function(){
  //update Table
  console.log("Updating Table...");
  var startSummary = $('#startSummaryPicker').val();
  var endSummary = $('#endSummaryPicker').val();
  buildSummary(startSummary, endSummary);
});

//add tablesorter to summaryTable
$("#summaryTable").tablesorter();

//Set Default End Date to Today
$('#endSummaryPicker, #date').val(new Date().toDateInputValue());

var startSummary = new Date();
startSummary.setDate(startSummary.getDate() - 6);
$('#startSummaryPicker').val(startSummary.toDateInputValue());

//Initialize summaryTable with Previous Week's Data
var today = new Date(Date.now());
var endSummary = today.toJSONLocal();
today.setDate(today.getDate() - 6);
var startSummary = today.toJSONLocal();

buildSummary(startSummary, endSummary);
