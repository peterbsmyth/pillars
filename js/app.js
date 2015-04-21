//Build Day Table given a date
var buildTable = function(selectedDate){

  //Build Data String
  var startDay = selectedDate;
  var endDay = startDay + "T23:59:59";
  var data = {content : "today", startDay: startDay,endDay: endDay};

  $.getJSON("functions.php",{content : "today", startDay: startDay,endDay: endDay},function(response){
    //empty current table
    var $tableBody = $("#dayTable TBODY");
    $tableBody.empty();

    //add new table
    response.forEach(function(item){
      var $row = $("<tr>").attr("id", item.id);

      var $edit= $("<td>").addClass("edit"); //use BootStrap pencil glyphicon
      $("<a href='#'></a>").addClass("glyphicon glyphicon-pencil").appendTo($edit);
      $row.append($edit);

      var $pillar = $("<td>").html(item.pillar).addClass("pillar");
      $row.append($pillar);

      var $datetime = $("<td>").html(item.event_date).addClass("datetime");
      $row.append($datetime);

      var $duration = $("<td>").html(item.duration).addClass("duration");
      $row.append($duration);

      var $quality = $("<td>").html(item.quality).addClass("quality");
      $row.append($quality);

      var $notes = $("<td>").html(item.notes).addClass("notes");
      $row.append($notes);

      $tableBody.append($row);
    });
    $("#dayTable").trigger("update");
  });
}

//Build Summary Table given a date
var buildSummary = function(startSummary, endSummary){

  //Build Data String
  var startSummary = startSummary;
  var endSummary = endSummary;

  $.getJSON("functions.php",{content : "summary", startSummary: startSummary, endSummary: endSummary},function(response){
    //empty current table
    var $tableBody = $("#summaryTable TBODY");
    $tableBody.empty();

    //add new table
    response.forEach(function(item){
      var $row = $("<tr>").attr("id", item.id);

      var $edit= $("<td>").addClass("edit"); //use BootStrap pencil glyphicon
      $("<a href='#'></a>").addClass("glyphicon glyphicon-pencil").appendTo($edit);
      $row.append($edit);

      var $date = $("<td>").html(item.event_date).addClass("date");
      $row.append($date);

      var $quality = $("<td>").html(item.quality).addClass("quality");
      $row.append($quality);

      var $notes = $("<td>").html(item.notes).addClass("notes");
      $row.append($notes);

      $tableBody.append($row);
    });
    $("#summaryTable").trigger("update");
  });
}

// //Update Rows
// var updateRows = function (rowJSON){
//   var row = $("<tr/>").attr("id",rowJSON.id);
//   // var $td= $("<td>").html("<a>edit</a>"); //use BootStrap pencil glyphicon
//   var $td= $("<td>").append("<a>").html("edit");
//   $(row).append($td);
//   $(row).append("<td>" + rowJSON.id + "</td>");
//   $(row).append("<td>" + rowJSON.pillar + "</td>");
//   $(row).append("<td>" + rowJSON.event_date + "</td>");
//   $(row).append("<td>" + rowJSON.duration + "</td>");
//   $(row).append("<td>" + rowJSON.quality + "</td>");
//   $(row).append("<td>" + rowJSON.notes +  "</td>");
//   $(row).append("<td>" + rowJSON.entry_utc_timestamp +  "</td>");
//
//   $("#" + rowJSON.id).replaceWith(row);
//   $("#entryTable").trigger("update");
// }

//Update dayTable with new Entry
$( "#single-entry" ).on( "submit", function( event ) {
  event.preventDefault();
  $("#addEntryModal").modal('hide');

  //build data string
  var data= $(this).serialize() + "&content=newEntry";

  $.ajax({
    type: "POST",
    url: "functions.php",
    data: data,
    dataType: "json",
    success: function(response) {
      var $row = $("<tr>").attr("id", response.id);

      var $edit= $("<td>").addClass("edit"); //use BootStrap pencil glyphicon
      $("<a href='#'></a>").addClass("glyphicon glyphicon-pencil").appendTo($edit);
      $row.append($edit);

      var $pillar = $("<td>").html(response.pillar).addClass("pillar");
      $row.append($pillar);

      var $datetime = $("<td>").html(response.event_date).addClass("datetime");
      $row.append($datetime);

      var $duration = $("<td>").html(response.duration).addClass("duration");
      $row.append($duration);

      var $quality = $("<td>").html(response.quality).addClass("quality");
      $row.append($quality);

      var $notes = $("<td>").html(response.notes).addClass("notes");
      $row.append($notes);

      $("#dayTable TBODY").append($row);
      $("#dayTable").trigger("update");
    }
  });//http://stackoverflow.com/questions/15173965/serializing-and-submitting-a-form-with-jquery-post-and-php
});

//Update summaryTable with new Entry
$( "#summary-entry" ).on( "submit", function( event ) {
  event.preventDefault();
  $("#addSummaryModal").modal('hide');

  //build data string
  var data= $(this).serialize() + "&content=newSummary";

  $.ajax({
    type: "POST",
    url: "functions.php",
    data: data,
    dataType: "json",
    success: function(response) {
      var $row = $("<tr>").attr("id", response.id);

      var $edit= $("<td>").addClass("edit"); //use BootStrap pencil glyphicon
      $("<a href='#'></a>").addClass("glyphicon glyphicon-pencil").appendTo($edit);
      $row.append($edit);

      var $date = $("<td>").html(response.event_date).addClass("date");
      $row.append($date);

      var $quality = $("<td>").html(response.quality).addClass("quality");
      $row.append($quality);

      var $notes = $("<td>").html(response.notes).addClass("notes");
      $row.append($notes);

      $("#summaryTable TBODY").append($row);
      $("#summaryTable").trigger("update");
    }
  });//http://stackoverflow.com/questions/15173965/serializing-and-submitting-a-form-with-jquery-post-and-php
});


//Edit Rows on DayTable
$("#dayTable").on('click', ".edit", function() {

  //Toggle Edit Mode
  $(this).parent().toggleClass("editMode");

  //Is edit mode active?
  var hasEditMode = $(this).parent().hasClass("editMode");

  //Turn on Edit Mode
  if (hasEditMode){
    $(this).children().toggleClass("glyphicon-pencil glyphicon-ok");

    var pillar = $(this).siblings(".pillar").html();
    var datetime = $(this).siblings(".datetime").html();
    datetime = datetime.replace(" ","T");//format for input
    var duration = $(this).siblings(".duration").html();
    var quality = $(this).siblings(".quality").html();
    var notes = $(this).siblings(".notes").html();

    var $pillarInput = $("#pillar").clone().addClass("form-control input-sm");
    $pillarInput.children("option[value='" + pillar + "']").attr("selected","selected"); //set selected
    var $datetimeInput = $("<input>").attr("value",datetime).addClass("form-control input-sm").attr("type","datetime-local");
    var $durationInput = $("<input>").attr("value",duration).addClass("form-control input-sm").attr("type","text");
    var $qualityInput = $("#quality").clone().addClass("form-control input-sm").css("display","initial");
    $qualityInput.children("option[value='" + quality + "']").attr("selected","selected"); //set selected
    var $notesInput = $("<input>").attr("value",notes).addClass("form-control input-sm").attr("type","text");

    $(this).siblings(".pillar").empty().append($pillarInput);
    $(this).siblings(".datetime").empty().append($datetimeInput);
    $(this).siblings(".duration").empty().append($durationInput);
    $(this).siblings(".quality").empty().append($qualityInput);
    $(this).siblings(".notes").empty().append($notesInput);

  }
  //Shut off Edit Mode
  else{
    $(this).children().toggleClass("glyphicon-pencil glyphicon-ok");

    var id = $(this).parent().attr("id");
    var pillar = $(this).siblings(".pillar").children().val();
    var datetime = encodeURIComponent($(this).siblings(".datetime").children().val());
    var duration = encodeURIComponent($(this).siblings(".duration").children().val());
    var quality = $(this).siblings(".quality").children().val();
    var notes = encodeURIComponent($(this).siblings(".notes").children().val());

    //build data string
    var data = "user_id=" + id +
               "&user_pillar=" + pillar +
               "&user_date=" + datetime +
               "&user_duration=" + duration +
               "&user_quality=" + quality +
               "&user_notes=" + notes +
               "&content=updateEntry";

    console.log(data);
    $.ajax({
      type: "POST",
      url: "functions.php",
      data: data,
      dataType: "json",
      success: function(response) {
        console.log(response);
        $("#" + response.id).children(".pillar").replaceWith("<td class='pillar'>" + response.pillar + "</td>");
        $("#" + response.id).children(".datetime").replaceWith("<td class='datetime'>" + response.event_date + "</td>");
        $("#" + response.id).children(".duration").replaceWith("<td class='duration'>" + response.duration + "</td>");
        $("#" + response.id).children(".quality").replaceWith("<td class='quality'>" + response.quality + "</td>");
        $("#" + response.id).children(".notes").replaceWith("<td class='notes'>" + response.notes + "</td>");
        $("#dayTable").trigger("update");
      }
    });
  }
});// Using Event Delegation...whats that? http://stackoverflow.com/questions/16893043/jquery-click-event-not-working-after-adding-class-using-jquery ALSO SEE: https://learn.jquery.com/events/event-delegation/


//Edit Rows on summaryTable
$("#summaryTable").on('click', ".edit", function() {

  //Toggle Edit Mode
  $(this).parent().toggleClass("editMode");

  //Is edit mode active?
  var hasEditMode = $(this).parent().hasClass("editMode");

  //Turn on Edit Mode
  if (hasEditMode){
    $(this).children().toggleClass("glyphicon-pencil glyphicon-ok");

    var date = $(this).siblings(".date").html();
    var quality = $(this).siblings(".quality").html();
    var notes = $(this).siblings(".notes").html();

    var $dateInput = $("<input>").attr("value",date).addClass("form-control input-sm").attr("type","date");
    var $qualityInput = $("#quality").clone().addClass("form-control input-sm").css("display","initial");
    $qualityInput.children("option[value='" + quality + "']").attr("selected","selected"); //set selected
    var $notesInput = $("<input>").attr("value",notes).addClass("form-control input-sm").attr("type","text");

    $(this).siblings(".date").empty().append($dateInput);
    $(this).siblings(".quality").empty().append($qualityInput);
    $(this).siblings(".notes").empty().append($notesInput);

  }
  //Shut off Edit Mode
  else{
    $(this).children().toggleClass("glyphicon-pencil glyphicon-ok");

    var id = $(this).parent().attr("id");
    var date = encodeURIComponent($(this).siblings(".date").children().val());
    var quality = $(this).siblings(".quality").children().val();
    var notes = encodeURIComponent($(this).siblings(".notes").children().val());

    //build data string
    var data = "user_id=" + id +
               "&user_date=" + date +
               "&user_quality=" + quality +
               "&user_notes=" + notes +
               "&content=updateSummary";

    console.log(data);
    $.ajax({
      type: "POST",
      url: "functions.php",
      data: data,
      dataType: "json",
      success: function(response) {
        console.log(response);
        $("#" + response.id).children(".date").replaceWith("<td class='date'>" + response.event_date + "</td>");
        $("#" + response.id).children(".quality").replaceWith("<td class='quality'>" + response.quality + "</td>");
        $("#" + response.id).children(".notes").replaceWith("<td class='notes'>" + response.notes + "</td>");
        $("#summaryTable").trigger("update");
      }
    });
  }
});// Using Event Delegation...whats that? http://stackoverflow.com/questions/16893043/jquery-click-event-not-working-after-adding-class-using-jquery ALSO SEE: https://learn.jquery.com/events/event-delegation/

// }); // With Guidance from http://codereview.stackexchange.com/questions/38816/jquery-dynamic-elements-like-tr-and-td-add-to-html-table
