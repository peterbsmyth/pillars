//Candidate for Improvement Add Error Handling to AJAX functions

//variables for dayTable + summaryTable tds
var pillar, datetime, duration, quality, notes;

//Build dayTable given a date
var buildTable = function(selectedDate){

  //Build Data String
  var startDay = selectedDate;
  var endDay = startDay + "T23:59:59";

  $.getJSON("functions.php",{content : "pillarsLog", startDay: startDay,endDay: endDay},function(response){
    console.log(response);
    //empty current table.
    var $tableBody = $("#dayTable TBODY");
    $tableBody.empty();

    //add new table
    response.forEach(function(item){
      var $row = $("<tr>").attr("id", item.id);  //candidate for learning ... difference between "<td>" and "td"

      var $edit= $("<td>").addClass("edit"); //use BootStrap pencil glyphicon
      $("<a href='#'></a>").addClass("okay glyphicon glyphicon-pencil").appendTo($edit);
      $("<a href='#'></a>").addClass("cancel glyphicon glyphicon-remove").hide().appendTo($edit);
      $row.append($edit);

      var $pillar = $("<td>").html(item.pillar).addClass("pillar");
      $row.append($pillar);

      var $datetime = $("<td>").html(datetimeFormat(item.event_date)).addClass("datetime");
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
    console.log(response);


  });
};

//Build summaryTable given a date
var buildSummary = function(startSummary, endSummary){

  //Build Data String

  $.getJSON("functions.php",{content : "summary", startSummary: startSummary, endSummary: endSummary},function(response){
    //empty current table
    var $tableBody = $("#summaryTable TBODY");
    $tableBody.empty();

    //add new table
    response.forEach(function(item){
      var $row = $("<tr>").attr("id", item.id);

      var $edit= $("<td>").addClass("edit"); //use BootStrap pencil glyphicon
      $("<a href='#'></a>").addClass("okay glyphicon glyphicon-pencil").appendTo($edit);
      $("<a href='#'></a>").addClass("cancel glyphicon glyphicon-remove").hide().appendTo($edit);
      $row.append($edit);

      var $date = $("<td>").html(item.event_date.toDateFormat()).addClass("date");
      $row.append($date);

      var $quality = $("<td>").html(item.quality).addClass("quality");
      $row.append($quality);

      var $notes = $("<td>").html(item.notes).addClass("notes");
      $row.append($notes);

      $tableBody.append($row);
    });
    $("#summaryTable").trigger("update");
  });
};

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
      $("<a href='#'></a>").addClass("okay glyphicon glyphicon-pencil").appendTo($edit);
      $("<a href='#'></a>").addClass("cancel glyphicon glyphicon-remove").hide().appendTo($edit);
      $row.append($edit);

      var $pillar = $("<td>").html(response.pillar).addClass("pillar");
      $row.append($pillar);

      var $datetime = $("<td>").html(datetimeFormat(response.event_date)).addClass("datetime");
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
      $("<a href='#'></a>").addClass("okay glyphicon glyphicon-pencil").appendTo($edit);
      $("<a href='#'></a>").addClass("cancel glyphicon glyphicon-remove").hide().appendTo($edit);
      $row.append($edit);

      var $date = $("<td>").html(response.event_date.toDateFormat()).addClass("date");
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
$("#dayTable").on('click', ".okay", function() {
  var $editRow = $(this).closest("tr");

  //Toggle Edit Mode
  $editRow.toggleClass("editMode");

  //Is edit mode active?
  var hasEditMode = $editRow.hasClass("editMode");

  //Turn on Edit Mode
  if (hasEditMode){
    //toggle pencil and okay icons
    //show cancel icon
    $editRow.find("a").first().toggleClass("glyphicon-pencil glyphicon-ok");
    $editRow.find("a").last().show();

    //select td html
    pillar = $editRow.children(".pillar").html();
    datetime = $editRow.children(".datetime").html();
    datetime = new Date(datetime).toDatetimeInputValue();//format for input
    duration = $editRow.children(".duration").html();
    quality = $editRow.children(".quality").html();
    notes = $editRow.children(".notes").html();

    //build inputs using td html
    var $pillarInput = $("#pillar").clone().addClass("form-control input-sm");
    $pillarInput.children("option[value='" + pillar + "']").attr("selected","selected"); //set selected
    var $datetimeInput = $("<input>").attr("value",datetime).addClass("form-control input-sm").attr("type","datetime-local");
    var $durationInput = $("<input>").attr("value",duration).addClass("form-control input-sm").attr("type","text");
    var $qualityInput = $("#quality").clone().addClass("form-control input-sm").css("display","initial");
    $qualityInput.children("option[value='" + quality + "']").attr("selected","selected"); //set selected
    var $notesInput = $("<input>").attr("value",notes).addClass("form-control input-sm").attr("type","text");

    //empty tds and add inputs
    $editRow.children(".pillar").empty().append($pillarInput);
    $editRow.children(".datetime").empty().append($datetimeInput);
    $editRow.children(".duration").empty().append($durationInput);
    $editRow.children(".quality").empty().append($qualityInput);
    $editRow.children(".notes").empty().append($notesInput);

  }

  //Accept Edit Mode Changes
  else{
    //input values
    var idI = $editRow.attr("id");
    var pillarI = $editRow.children(".pillar").children().val();
    var datetimeI = encodeURIComponent($editRow.children(".datetime").children().val());
    var durationI = encodeURIComponent($editRow.children(".duration").children().val());
    var qualityI = $editRow.children(".quality").children().val();
    var notesI = encodeURIComponent($editRow.children(".notes").children().val());

    //POST data string
    var data = "user_id=" + idI +
               "&user_pillar=" + pillarI +
               "&user_date=" + datetimeI +
               "&user_duration=" + durationI +
               "&user_quality=" + qualityI +
               "&user_notes=" + notesI +
               "&content=updateEntry";

    //toggle pencil and okay icons
    //hide cancel icon
    $editRow.find("a").first().toggleClass("glyphicon-pencil glyphicon-ok");
    $editRow.find("a").last().hide();

    console.log(data);
    $.ajax({
      type: "POST",
      url: "functions.php",
      data: data,
      dataType: "json",
      success: function(response) {
        //replace inputs with new tds
        $("#" + response.id).children(".pillar").replaceWith("<td class='pillar'>" + response.pillar + "</td>");
        $("#" + response.id).children(".datetime").replaceWith("<td class='datetime'>" + datetimeFormat(response.event_date) + "</td>");
        $("#" + response.id).children(".duration").replaceWith("<td class='duration'>" + response.duration + "</td>");
        $("#" + response.id).children(".quality").replaceWith("<td class='quality'>" + response.quality + "</td>");
        $("#" + response.id).children(".notes").replaceWith("<td class='notes'>" + response.notes + "</td>");
        $("#dayTable").trigger("update");
      }
    });
  }
});// Using Event Delegation...https://learn.jquery.com/events/event-delegation/

//Cancel DayTable Edit
$("#dayTable").on('click', ".cancel", function() {
  //remove edit mode
  var $editRow = $(this).closest("tr");

  //Toggle Edit Mode
  //Toggle Pencil / Okay icons
  //hide cancel button
  $editRow.toggleClass("editMode");
  $(this).siblings().toggleClass("glyphicon-pencil glyphicon-ok");
  $(this).hide();

  //inputs back to original tds
  $editRow.children(".pillar").replaceWith("<td class='pillar'>" + pillar + "</td>");
  $editRow.children(".datetime").replaceWith("<td class='datetime'>" + datetimeFormat(datetime) + "</td>");
  $editRow.children(".duration").replaceWith("<td class='duration'>" + duration + "</td>");
  $editRow.children(".quality").replaceWith("<td class='quality'>" + quality + "</td>");
  $editRow.children(".notes").replaceWith("<td class='notes'>" + notes + "</td>");
});

//Edit Rows on summaryTable
$("#summaryTable").on('click', ".okay", function() {
  var $editRow = $(this).closest("tr");

  //Toggle Edit Mode
  $editRow.toggleClass("editMode");

  //Is edit mode active?
  var hasEditMode = $editRow.hasClass("editMode");

  //Turn on Edit Mode
  if (hasEditMode){
    //toggle pencil and okay icons
    //show cancel icon
    $editRow.find("a").first().toggleClass("glyphicon-pencil glyphicon-ok");
    $editRow.find("a").last().show();

    //select td html
    date = $editRow.children(".date").html();
    date = new Date(date).toDateInputValue();
    quality = $editRow.children(".quality").html();
    notes = $editRow.children(".notes").html();

    //build inputs using td html
    var $dateInput = $("<input>").attr("value",date).addClass("form-control input-sm").attr("type","date");
    var $qualityInput = $("#quality").clone().addClass("form-control input-sm").css("display","initial");
    $qualityInput.children("option[value='" + quality + "']").attr("selected","selected"); //set selected
    var $notesInput = $("<input>").attr("value",notes).addClass("form-control input-sm").attr("type","text");

    //empty tds and add inputs
    $editRow.children(".date").empty().append($dateInput);
    $editRow.children(".quality").empty().append($qualityInput);
    $editRow.children(".notes").empty().append($notesInput);
  }
  //Accept Edit Mode Changes
  else{
    //input values
    var idI = $editRow.attr("id");
    var dateI = encodeURIComponent($editRow.children(".date").children().val());
    var qualityI = $editRow.children(".quality").children().val();
    var notesI = encodeURIComponent($editRow.children(".notes").children().val());

    //build data string
    var data = "user_id=" + idI +
               "&user_date=" + dateI +
               "&user_quality=" + qualityI +
               "&user_notes=" + notesI +
               "&content=updateSummary";

    //toggle pencil and okay icons
    //hide cancel icon
    $editRow.find("a").first().toggleClass("glyphicon-pencil glyphicon-ok");
    $editRow.find("a").last().hide();

    $.ajax({
      type: "POST",
      url: "functions.php",
      data: data,
      dataType: "json",
      success: function(response) {
        console.log(response);
        $("#" + response.id).children(".date").replaceWith("<td class='date'>" + response.event_date.toDateFormat() + "</td>");
        $("#" + response.id).children(".quality").replaceWith("<td class='quality'>" + response.quality + "</td>");
        $("#" + response.id).children(".notes").replaceWith("<td class='notes'>" + response.notes + "</td>");
        $("#summaryTable").trigger("update");
      }
    });
  }
});// Using Event Delegation... https://learn.jquery.com/events/event-delegation/

//Cancel DayTable Edit
$("#summaryTable").on('click', ".cancel", function() {
  //remove edit mode
  var $editRow = $(this).closest("tr");

  //Toggle Edit Mode
  //Toggle Pencil / Okay icons
  //hide cancel button
  $editRow.toggleClass("editMode");
  $(this).siblings().toggleClass("glyphicon-pencil glyphicon-ok");
  $(this).hide();

  //inputs back to original tds
  $editRow.children(".date").replaceWith("<td class='date'>" + date.toDateFormat() + "</td>");
  $editRow.children(".quality").replaceWith("<td class='quality'>" + quality + "</td>");
  $editRow.children(".notes").replaceWith("<td class='notes'>" + notes + "</td>");
});
