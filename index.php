<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8">  <!--set charset to utf-8-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!--enable mobile views-->
    
    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="css/normalize.css"> <!--reset css for cross-browser compatibility-->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"> 
    <link rel="stylesheet" type="text/css" href="css/agency.css"> 
    <!-- <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.css"> --> 
    <link rel="stylesheet" type="text/css" href="css/main.css"> 
    <link rel="stylesheet" type="text/css" href="css/responsive.css"> 


    <!-- JS -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.21.3/js/jquery.tablesorter.min.js"></script>
    <script type="text/javascript" src="js/functions.js"></script>
    <script type="text/javascript" src="js/bootstrap.js"></script>
    <title>PILLAR INPUT FORM</title>
  </head>
  <body>

    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
          <a class="form-control btn btn-success" data-toggle="modal" href="#addEntryModal">
            Add Entry
          </a>

          

          <div class="table-responsive">
            <table id="entryTable" class="table table-hover tablesorter">
              <THEAD>
                <tr>
                  <th scope="col">Edit</th>
                  <th scope="col">ID</th>
                  <th scope="col">PILLAR</th>
                  <th scope="col">DATETIME</th>
                  <th scope="col">DURATION</th>
                  <th scope="col">QUALITY</th>
                  <th scope="col">NOTES</th>
                  <th scope="col">TIMESTAMP</th>
                </tr>
              </THEAD>
              <TBODY id="day">
              </TBODY>
            </table>
          </div>


          <!-- UPDATE NOTES -->
          <form method="POST" class="form-inline" id="updateNotes">
            <legend><span class="number">2</span>Update Notes</legend>
            <div class="form-group">
              <label for="updateNotes_id">ID:</label>
              <input id ="updateNotes_id" type="text" name="user_id" class="form-control">
            </div>
            <div class="form-group ">
              <label for="updateNotes_notes">Notes:</label>
              <input id ="updateNotes_notes" type="text" name="user_notes" class="form-control">
            </div>
      <!--       <input type="date" name="newday_user_date2"> -->
            <button type="submit" class="btn btn-success">Sumbit</button>
          </form>

          <!-- UPDATE PILLAR -->
          <form method="POST" id="updatePillar" class="form-inline">
            <legend><span class="number">3</span>Update Pillar</legend>

            <div class="form-group">
              <label for="updatePillar_id">ID:</label>
              <input id ="updatePillar_id" type="text" name="user_id" class="form-control">
            </div>

            <div class="form-group">
              <label for="pillar">Pillar:</label>
              <select id="updatePillar_pillar" name="user_pillar" class="form-control">
                <option value="ZAZEN">ZAZEN</option>
                <option value="WORK">WORK</option>
                <option value="SOCIAL">SOCIAL</option>
                <option value="LEARN">LEARN</option>
                <option value="BIKE">BIKE</option>
                <option value="EAT WELL">EAT WELL</option>
                <option value="SLACK">SLACK</option>
              </select>
            </div>
            <!--       <input type="date" name="newday_user_date2"> -->
            <button type="submit" class="btn btn-success">Sumbit</button>
          </form>

          <!-- UPDATE DURATION -->
          <form method="POST" id="updateDuration" class="form-inline">
            <legend><span class="number">3</span>Update Duration</legend>

            <div class="form-group">
              <label for="updatePillar_id">ID:</label>
              <input id ="updatePillar_id" type="text" name="user_id" class="form-control">
            </div>

            <div class="form-group">
              <label for="duration">Duration:</label>
              <input type="text" id="duration" name="user_duration" placeholder="HH:MM" class="form-control">
            </div>
            <!--       <input type="date" name="newday_user_date2"> -->
            <button type="submit" class="btn btn-success">Sumbit</button>
          </form>

          <!-- ADD DAY -->
          <form method="post" id="addDay" class="form">
            <legend><span class="number">4</span> Add Day Entry</legend>
            <div class="form-group">
              <label for="day_date">Date:</label>
              <input type="date" id="day_date" name="user_date" class="form-control">
            </div>
            <div class="form-group">
              <label>Quality:</label>


              
              <label class="radio-inline"><input type="radio" id="day_yay" value="YAY" name="user_quality">Yay</label>
              
              <label class="radio-inline"><input type="radio" id="day_solid" value="SOLID" name="user_quality">Solid</label>
              
              
              <label class="radio-inline"><input type="radio" id="day_wrench" value="WRENCH" name="user_quality">Wrench</label>
              
              
              <label class="radio-inline"><input type="radio" id="day_null" value="NULL" name="user_quality" checked="checked">Null</label>
            </div>

            <div class="form-group">
              <label for="day_notes">Notes:</label>
              <input type="textarea" id="day_notes" name="user_notes" class="form-control">
            </div>

            <button type="submit" class="btn btn-success">Add Entry</button>

          </form>

          
          <!-- NEW DAY -->
          <form method="POST" id="newDay" class="form-inline">
            <legend><span class="number">5</span>New Day</legend>
            <label for="newDayValue">Notes:</label>
            <input id ="newDayValue" type="date" name="newday_user_date1" class="form-control">
      <!--       <input type="date" name="newday_user_date2"> -->
            <button type="submit" class="btn btn-success">Sumbit</button>
          </form>

        </div>

      </div>
    </div>

    

    <div class="modal fade" id="addEntryModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Add Entry</h4>
          </div>
          <div class="modal-body">
            <form class="form" method="post" id="single-entry">
        
          
              <div class="row">

                <div class="col-sm-6">  
                  <div class="form-group">
                    <label for="pillar">Pillar:</label>
                    <select id="pillar" name="user_pillar" class="form-control">
                      <option value="ZAZEN">ZAZEN</option>
                      <option value="WORK">WORK</option>
                      <option value="SOCIAL">SOCIAL</option>
                      <option value="LEARN">LEARN</option>
                      <option value="BIKE">BIKE</option>
                      <option value="EAT WELL">EAT WELL</option>
                      <option value="SLACK">SLACK</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="date">Date:</label>
                    <input type="datetime-local" id="date" name="user_date" class="form-control">
                  </div>

                </div>

                <div class="col-sm-6"> 
                  <div class="form-group">
                    <label for="duration">Duration:</label>
                    <input type="text" id="duration" name="user_duration" placeholder="HH:MM" class="form-control">
                  </div>

                  <div class="form-group">
                    <label for="notes">Notes:</label>
                    <input type="text" id="notes" name="user_notes" class="form-control">
                  </div>
                </div>

                <div class="form-group">
                    <label>Quality:</label>
                    
                    <label class="radio-inline"><input type="radio" id="yay" value="YAY" name="user_quality">Yay</label>
                    
                    <label class="radio-inline"><input type="radio" id="solid" value="SOLID" name="user_quality">Solid</label>
                    
                    <label class="radio-inline"><input type="radio" id="wrench" value="WRENCH" name="user_quality">Wrench</label>
                    
                    <label class="radio-inline"><input type="radio" id="null" value="NULL" name="user_quality" checked="checked">Null</label>
                  </div>
              </div>
            

              <button type="submit" class="btn btn-success form-control">Add Entry</button>

            
          </form>
          </div>
        </div>
      </div>
    </div>   

    <script type="text/javascript">
      $(document).ready(function(){
        
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

        //Edit duration
        $("table").on('click', ".edit", function() {
          var getContents = $(this).siblings(".duration").html();
          var addInput = $("<input>").val(getContents).addClass("form-control input-sm").attr("type","text");
          $(this).siblings(".duration").empty().append(addInput);
        });// Using Event Delegation...whats that? http://stackoverflow.com/questions/16893043/jquery-click-event-not-working-after-adding-class-using-jquery ALSO SEE: https://learn.jquery.com/events/event-delegation/

      }); // With Guidance from http://codereview.stackexchange.com/questions/38816/jquery-dynamic-elements-like-tr-and-td-add-to-html-table
    </script>
  </body>
</html>


