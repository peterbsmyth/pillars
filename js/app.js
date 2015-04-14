$("#dayTable").hide();
$("#dayTable").tablesorter();
var url = "functions.php";
var data = { page: "lastEntry" };

//Update Rows
var updateRows = function (rowJSON){
  var row = $("<tr/>").attr("id",rowJSON.id);
  // var $td= $("<td>").html("<a>edit</a>"); //use BootStrap pencil glyphicon
  var $td= $("<td>").append("<a>").html("edit");
  $(row).append($td);
  $(row).append("<td>" + rowJSON.id + "</td>");
  $(row).append("<td>" + rowJSON.pillar + "</td>");
  $(row).append("<td>" + rowJSON.event_date + "</td>");
  $(row).append("<td>" + rowJSON.duration + "</td>");
  $(row).append("<td>" + rowJSON.quality + "</td>");
  $(row).append("<td>" + rowJSON.notes +  "</td>");
  $(row).append("<td>" + rowJSON.entry_utc_timestamp +  "</td>");

  $("#" + rowJSON.id).replaceWith(row);
  $("#entryTable").trigger("update");
}

//Print rows to table
var data = {page : "day" };
$.getJSON(url,data,function(response){
  console.log(response);
  response.forEach(function(item){
    var row = $("<tr/>").attr("id", item.id);

    var $td= $("<td>").html("<a href='#'>edit</a>"); //use BootStrap pencil glyphicon

    var $tdDuration = $("<td>").html(item.duration).addClass("duration");
    $($td).addClass("edit");
    $(row).append($td);
    $(row).append("<td>" + item.id + "</td>");
    $(row).append("<td>" + item.pillar + "</td>");
    $(row).append("<td>" + item.event_date + "</td>");
    $(row).append($tdDuration);
    $(row).append("<td>" + item.quality + "</td>");
    $(row).append("<td>" + item.notes +  "</td>");
    $(row).append("<td>" + item.entry_utc_timestamp +  "</td>");
    $("#day").append(row);
  });
  $("#entryTable").tablesorter({debug:false});
});

// var new1DayValue;
// $("#newDayValue").change(function() {
//   new1DayValue = $( this ).val();
// });

// $("<td>").click(function(){
//   console.log(new1DayValue);
// });

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
} // From: http://stackoverflow.com/questions/563406/add-days-to-datetime

// Change Day View
$( "#newDay" ).on( "submit", function( event ) {
  event.preventDefault();
  var value = $("#newDayValue").val();
  var data= $(this).serialize();
  data = data + "&newday_user_date2=" + value;
  var page = "&page=newDay";
  var data = data + page;
  $.getJSON(url,data,function(response){
    $("#dayTable").show();
    $("#selectDayBody").children().remove();
    // console.log(response);
    response.forEach(function(item){
      var row = $("<tr/>").attr("role","row");
      $(row).append("<td>" + item.id + "</td>");
      $(row).append("<td>" + item.pillar + "</td>");
      $(row).append("<td>" + item.event_date + "</td>");
      $(row).append("<td>" + item.duration + "</td>");
      $(row).append("<td>" + item.quality + "</td>");
      $(row).append("<td>" + item.notes +  "</td>");
      $(row).append("<td>" + item.entry_utc_timestamp +  "</td>");
      $("#selectDayBody").append(row);
      $("#dayTable").trigger("update");
    });
  });
});


//Update Table with new Entry
$( "#single-entry" ).on( "submit", function( event ) {
  event.preventDefault();
  $("#addEntryModal").modal('hide');
  var url = "functions.php";
  var data= $(this).serialize();
  var page = "&page=newEntry";
  var data = data + page;
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: "json",
    success: function(response) {
      // console.log(response);
      var row = $("<tr/>");
      var $td= $("<td>").html("<a>edit</a>"); //use BootStrap pencil glyphicon
      $(row).append($td);
      $(row).append("<td>" + response.id + "</td>");
      $(row).append("<td>" + response.pillar + "</td>");
      $(row).append("<td>" + response.event_date + "</td>");
      $(row).append("<td>" + response.duration + "</td>");
      $(row).append("<td>" + response.quality + "</td>");
      $(row).append("<td>" + response.notes +  "</td>");
      $(row).append("<td>" + response.entry_utc_timestamp +  "</td>");
      $("#day").append(row);
      $("#entryTable").trigger("update");
    }
  });//http://stackoverflow.com/questions/15173965/serializing-and-submitting-a-form-with-jquery-post-and-php
});

//Add Day
$("#addDay").on( "submit", function( event ) {
  event.preventDefault();
  var data = $(this).serialize();
  var page = "&page=addDay";
  var data = data + page;
  $.post("functions.php",data,function(response){
    // console.log(response);
  });
  // console.log(data);
});

//

//Update Notes
$("#updateNotes").on("submit", function(event){
  event.preventDefault();
  var data = $(this).serialize();
  var page = "&page=updateNotes";
  var data = data + page;
  // console.log(data);
  $.ajax({
    type: "POST",
    url: "functions.php",
    data: data,
    dataType: "json",
    success: function(response) {
      updateRows(response);
    }
  });
});

//Update Pillar
$("#updatePillar").on("submit", function(event){
  event.preventDefault();
  var data = $(this).serialize();
  var page = "&page=updatePillar";
  var data = data + page;
  // console.log(data);
  $.ajax({
    type: "POST",
    url: "functions.php",
    data: data,
    dataType: "json",
    success: function(response) {
      updateRows(response);
    }
  });
});

//Update Duration
$("#updateDuration").on("submit", function(event){
  event.preventDefault();
  var data = $(this).serialize();
  var page = "&page=updateDuration";
  var data = data + page;
  console.log(data);
  $.ajax({
    type: "POST",
    url: "functions.php",
    data: data,
    dataType: "json",
    success: function(response) {
      updateRows(response);
    }
  });
});

//Edit duration
$("table").on('click', ".edit", function() {
  $(this).parent().toggleClass("editMode");
  var hasClass = $(this).parent().hasClass("editMode");
  if (hasClass){
    var getContents = $(this).siblings(".duration").html();
    console.log(getContents);
    var addInput = $("<input>").attr("value",getContents).addClass("form-control input-sm").attr("type","text");
    $(this).siblings(".duration").empty().append(addInput);
  }
  else{
    var getContents = $(this).siblings(".duration").children().val();
    var getID = $(this).parent().attr("id");
    var duration = escape(getContents);
    var data = "user_id=" + getID + "&user_duration=" + duration + "&page=updateDuration";
    console.log(data);
    $.ajax({
      type: "POST",
      url: "functions.php",
      data: data,
      dataType: "json",
      success: function(response) {
        console.log(response);
        $("#" + response.id).children(".duration").replaceWith("<td class='duration'>" + response.duration + "</td>");
        // $(this).siblings(".duration").empty().append(response.duration);
      }
    });
  }
});// Using Event Delegation...whats that? http://stackoverflow.com/questions/16893043/jquery-click-event-not-working-after-adding-class-using-jquery ALSO SEE: https://learn.jquery.com/events/event-delegation/

// }); // With Guidance from http://codereview.stackexchange.com/questions/38816/jquery-dynamic-elements-like-tr-and-td-add-to-html-table
