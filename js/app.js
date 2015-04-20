// $("#dayTable").hide();
// $("#dayTable").tablesorter();
var url = "functions.php";
var data = { content: "lastEntry" };


//Build Table given a date
var buildTable = function(selectedDate){

  //Build Data String
  var startDay = selectedDate;
  var endDay = startDay + "T23:59:59";
  var data = {content : "today", startDay: startDay,endDay: endDay};

  $.getJSON("functions.php",{content : "today", startDay: startDay,endDay: endDay},function(response){
    //empty current table
    $("#dayTable TBODY").empty();

    //add new table
    response.forEach(function(item){
      var row = $("<tr>").attr("id", item.id);

      var edit= $("<td>").html("<a href='#'>edit</a>").addClass("edit"); //use BootStrap pencil glyphicon
      $(row).append(edit);

      var pillar = $("<td>").html(item.pillar).addClass("pillar");
      $(row).append(pillar);

      var datetime = $("<td>").html(item.event_date).addClass("datetime");
      $(row).append(datetime);

      var duration = $("<td>").html(item.duration).addClass("duration");
      $(row).append(duration);

      var quality = $("<td>").html(item.quality).addClass("quality");
      $(row).append(quality);

      var notes = $("<td>").html(item.notes).addClass("notes");
      $(row).append(notes);

      $("#dayTable TBODY").append(row);
    });


    $("#dayTable").trigger("update");
  });
}

$("#datePicker").on("change", function(){
  //update Table
  console.log($(this).val());
});

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

// //Print rows to day table
// var startToday = new Date(Date.now()).toJSONLocal();
// console.log(startToday);
// endToday = startToday + "T23:59:59";
// var data = {content : "today", startToday: startToday,endToday: endToday};
// $.getJSON(url,data,function(response){
//   console.log(response);
//   response.forEach(function(item){
//     var row = $("<tr/>").attr("id", item.id);
//
//     var $tdEdit= $("<td>").html("<a href='#'>edit</a>").addClass("edit"); //use BootStrap pencil glyphicon
//     var $tdPillar = $("<td>").html(item.pillar).addClass("pillar");
//     var $tdDuration = $("<td>").html(item.duration).addClass("duration");
//     var $tdQuality = $("<td>").html(item.quality).addClass("quality");
//     $(row).append($tdEdit);
//     // $(row).append("<td>" + item.id + "</td>");
//     $(row).append($tdPillar);
//     $(row).append("<td>" + item.event_date + "</td>");
//     $(row).append($tdDuration);
//     $(row).append($tdQuality);
//     $(row).append("<td>" + item.notes +  "</td>");
//     $("#dayTable TBODY").append(row);
//   });
//   $("#dayTable").tablesorter({debug:false});
// });

//Print rows to day table
var data = {content: "days"}
$.getJSON(url,data,function(response){
  console.log(response);
  response.forEach(function(item){
    var row = $("<tr/>").attr("id", item.id);

    var $tdEdit= $("<td>").html("<a href='#'>edit</a>"); //use BootStrap pencil glyphicon
    var $tdPillar = $("<td>").html(item.pillar).addClass("pillar");
    var $tdQuality = $("<td>").html(item.quality).addClass("quality");
    $($tdEdit).addClass("edit");
    $(row).append($tdEdit);
    $(row).append("<td>" + item.id + "</td>");
    $(row).append("<td>" + item.event_date + "</td>");
    $(row).append($tdQuality);
    $(row).append("<td>" + item.notes +  "</td>");
    $("#dayBody").append(row);
  });
  $("#dayTable").tablesorter();
});

// Change Day View
$( "#newDay" ).on( "submit", function( event ) {
  event.preventDefault();
  var value = $("#newDayValue").val();
  var day1 = new Date(value).toJSON();
  var day2 = new Date(value);
  var day2 = day2.setDate(day2.getDate() + 1);
  day2 = new Date(day2).toJSON();
  var content = "&content=newDay";
  var data = "user_newday_user_date1=" + day1.substring(0,10) + "&user_newday_user_date2=" + day2.substring(0,10) + content;
  $.getJSON("functions.php",data,function(response){
    console.log(response);
  //   $("#dayTable").show();
  //   $("#selectDayBody").children().remove();
  //   console.log(response);
  //   response.forEach(function(item){
  //     var row = $("<tr/>").attr("role","row");
  //     $(row).append("<td>" + item.id + "</td>");
  //     $(row).append("<td>" + item.pillar + "</td>");
  //     $(row).append("<td>" + item.event_date + "</td>");
  //     $(row).append("<td>" + item.duration + "</td>");
  //     $(row).append("<td>" + item.quality + "</td>");
  //     $(row).append("<td>" + item.notes +  "</td>");
  //     $(row).append("<td>" + item.entry_utc_timestamp +  "</td>");
  //     $("#selectDayBody").append(row);
  //     $("#dayTable").trigger("update");
  //   });
  });
});


//Update Table with new Entry
$( "#single-entry" ).on( "submit", function( event ) {
  event.preventDefault();
  $("#addEntryModal").modal('hide');
  var url = "functions.php";
  var data= $(this).serialize();
  var content = "&content=newEntry";
  var data = data + content;
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
  var content = "&content=addDay";
  var data = data + content;
  $.post("functions.php",data,function(response){
    // console.log(response);
  });
  // console.log(data);
});


//Update Duration
// $("#updateDuration").on("submit", function(event){
//   event.preventDefault();
//   var data = $(this).serialize();
//   var content = "&content=updateDuration";
//   var data = data + content;
//   console.log(data);
//   $.ajax({
//     type: "POST",
//     url: "functions.php",
//     data: data,
//     dataType: "json",
//     success: function(response) {
//       updateRows(response);
//     }
//   });
// });

//Edit duration
$("table").on('click', ".edit", function() {
  $(this).parent().toggleClass("editMode");
  var hasClass = $(this).parent().hasClass("editMode");
  if (hasClass){
    var getPillar = $(this).siblings(".pillar").html();
    var getDuration = $(this).siblings(".duration").html();
    var getQuality = $(this).siblings(".quality").html();
    // console.log(getPillar);
    var addPillar = $("<input>").attr("value",getPillar).addClass("form-control input-sm").attr("type","text");
    var addDuration = $("<input>").attr("value",getDuration).addClass("form-control input-sm").attr("type","text");
    // $("#pillar");

    var pilli = $("#pillar");
    $(this).siblings(".pillar").empty().append($(pilli).addClass("input-sm"));
    $(this).siblings(".duration").empty().append(addDuration);

  }
  else{
    var getID = $(this).parent().attr("id");
    var getDuration = escape($(this).siblings(".duration").children().val());
    var getPillar = $(this).siblings(".pillar").children().val();
    var data = "user_id=" + getID + "&user_duration=" + getDuration + "&user_pillar=" + getPillar + "&content=updateEntry";
    console.log(data);
    $.ajax({
      type: "POST",
      url: "functions.php",
      data: data,
      dataType: "json",
      success: function(response) {
        console.log(response);
        $("#" + response.id).children(".duration").replaceWith("<td class='duration'>" + response.duration + "</td>");
        $("#" + response.id).children(".pillar").replaceWith("<td class='pillar'>" + response.pillar + "</td>");
        $("#entryTable").trigger("update");
      }
    });
  }
});// Using Event Delegation...whats that? http://stackoverflow.com/questions/16893043/jquery-click-event-not-working-after-adding-class-using-jquery ALSO SEE: https://learn.jquery.com/events/event-delegation/

// }); // With Guidance from http://codereview.stackexchange.com/questions/38816/jquery-dynamic-elements-like-tr-and-td-add-to-html-table

//add tablesorter to dayTable
$("#dayTable").tablesorter();

//Set Default Date to Today
$('#datePicker').val(new Date().toDateInputValue());

//Initialize Day Table with Today's Data
var startToday = new Date(Date.now()).toJSONLocal();
buildTable(startToday);
