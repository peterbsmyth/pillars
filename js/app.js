// $("#dayTable").hide();
// $("#dayTable").tablesorter();
var url = "functions.php";
var data = { content: "lastEntry" };


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

      var $edit= $("<td>").html("<a href='#'>edit</a>").addClass("edit"); //use BootStrap pencil glyphicon
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

      var $edit= $("<td>").html("<a href='#'>edit</a>").addClass("edit"); //use BootStrap pencil glyphicon
      $row.append($edit);

      var $date = $("<td>").html(item.event_date).addClass("datetime");
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
