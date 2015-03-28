<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8">  <!--set charset to utf-8-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!--enable mobile views-->
    <link rel="stylesheet" type="text/css" href="css/normalize.css"> <!--reset css for cross-browser compatibility-->
    <link rel="stylesheet" type="text/css" href="css/main.css"> 
    <link rel="stylesheet" type="text/css" href="css/responsive.css"> 
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.21.3/js/jquery.tablesorter.min.js"></script>
    <script type="text/javascript" src="js/functions.js"></script>
    <title>PILLAR INPUT FORM</title>
  </head>
  <body>
    <form action="" method="post" id="single-entry">
      <legend><span class="number">1</span> Add Entry</legend>

      <label for="pillar">Pillar:</label>
      <select id="pillar" name="user_pillar">
        <option value="ZAZEN">ZAZEN</option>
        <option value="WORK">WORK</option>
        <option value="SOCIAL">SOCIAL</option>
        <option value="LEARN">LEARN</option>
        <option value="BIKE">BIKE</option>
        <option value="EAT WELL">EAT WELL</option>
        <option value="SLACK">SLACK</option>
      </select>

      <label for="date">Date:</label>
      <input type="datetime-local" id="date" name="user_date">

      <label for="duration">Duration:</label>
      <input type="text" id="duration" name="user_duration" value="HH:MM">

      <label for="quality">Quality:</label>
      <input type="radio" id="yay" value="YAY" name="user_quality">
      <label for="yay" class="light">Yay</label>
      <input type="radio" id="solid" value="SOLID" name="user_quality">
      <label for="solid" class="light">Solid</label>
      <input type="radio" id="wrench" value="WRENCH" name="user_quality">
      <label for="wrench" class="light">Wrench</label>
      <input type="radio" id="null" value="NULL" name="user_quality" checked="checked">
      <label for="null" class="light">Null</label>

      <label for="notes">Notes:</label>
      <input type="textarea" id="notes" name="user_notes">

      <button type="submit">Add Entry</button>

    </form>
    <div id="lastEntry"></div>

    <div>
      <table id="entryTable" class="tablesorter">
        <THEAD>
          <tr>
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

    <br>
    <br>
    <form action="functions2.php" method="post">
      <legend><span class="number">2</span> Add Day Entry</legend>

      <label for="day_date">Date:</label>
      <input type="date" id="day_date" name="user_date">

      <label for="quality">Quality:</label>
      <input type="radio" id="day_yay" value="YAY" name="user_quality">
      <label for="day_yay" class="light">Yay</label>
      <input type="radio" id="day_solid" value="SOLID" name="user_quality">
      <label for="day_solid" class="light">Solid</label>
      <input type="radio" id="day_wrench" value="WRENCH" name="user_quality">
      <label for="day_wrench" class="light">Wrench</label>
      <input type="radio" id="day_null" value="NULL" name="user_quality" checked="checked">
      <label for="day_null" class="light">Null</label>

      <label for="day_notes">Notes:</label>
      <input type="textarea" id="day_notes" name="user_notes">

      <button type="submit">Add Entry</button>

    </form>

    <form action="functions4.php" method="post">
      <legend><span class="number">3</span> Add Pillar Entry</legend>
      
      <label for="pillar_pillars">Pillar</label>
      <select id="pillar_pillars" name="user_pillar">
        <option value="ZAZEN">ZAZEN</option>
        <option value="WORK">WORK</option>
        <option value="SOCIAL">SOCIAL</option>
        <option value="LEARN">LEARN</option>
        <option value="BIKE">BIKE</option>
        <option value="EAT WELL">EAT WELL</option>
        <option value="SLACK">SLACK</option>  
      </select>

      <label for="pillar_date">Date:</label>
      <input type="date" id="pillar_date" name="user_date">

      <label for="quality">Quality:</label>
      <input type="radio" id="day_yay" value="YAY" name="user_quality">

      <label for="quality">Quality:</label>
      <input type="radio" id="pillar_yay" value="YAY" name="user_quality">
      <label for="pillar_yay" class="light">Yay</label>
      <input type="radio" id="pillar_solid" value="SOLID" name="user_quality">
      <label for="pillar_solid" class="light">Solid</label>
      <input type="radio" id="pillar_wrench" value="WRENCH" name="user_quality">
      <label for="pillar_wrench" class="light">Wrench</label>
      <input type="radio" id="pillar_null" value="NULL" name="user_quality" checked="checked">
      <label for="pillar_null" class="light">Null</label>

      <label for="pillar_notes">Notes:</label>
      <input type="textarea" id="pillar_notes" name="user_notes">

      <button type="submit">Add Entry</button>
      <br>
    <br>
    <br>
    <br>
    </form>

    <script type="text/javascript">
      $(document).ready(function(){
        

        var url = "functions.php";
        var data = { page: "lastEntry" };
        
        //Print Last Entry
        $.getJSON(url,data,function(response){
          $("#lastEntry").append("Last Entry: <br>")
          $("#lastEntry").append(response.id + "<br>");
          $("#lastEntry").append(response.pillar + "<br>");
          $("#lastEntry").append(response.event_date + "<br>");
          $("#lastEntry").append(response.duration + "<br>");
          $("#lastEntry").append(response.quality + "<br>");
          $("#lastEntry").append(response.notes);
        });

        //Print rows to table 
        var data = {page : "day" };
        $.getJSON(url,data,function(response){
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
          $("#entryTable").tablesorter(); 
        });

        //Update Table with new Entry 
        $( "#single-entry" ).on( "submit", function( event ) {
          event.preventDefault();
          var url = "functions.php";
          var data= $(this).serialize();
          var page = "&page=newEntry";
          var data = data + page;
          $("#date").val("2014-03-12T13T09");
          $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "json",
            success: function(response) {
              console.log(response);
              var row = $("<tr/>");
              $(row).append("<td>" + response.id + "</td>");
              $(row).append("<td>" + response.pillar + "</td>");
              $(row).append("<td>" + response.event_date + "</td>");
              $(row).append("<td>" + response.duration + "</td>");
              $(row).append("<td>" + response.quality + "</td>");
              $(row).append("<td>" + response.notes +  "</td>");
              $(row).append("<td>" + response.entry_utc_timestamp +  "</td>");
              $("#day").append(row);
              $("#entryTable").tablesorter();

            }
          });//http://stackoverflow.com/questions/15173965/serializing-and-submitting-a-form-with-jquery-post-and-php
        }); 
      }); // With Guidance from http://codereview.stackexchange.com/questions/38816/jquery-dynamic-elements-like-tr-and-td-add-to-html-table
    </script>
  </body>
</html>


