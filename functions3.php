<?php
//Variables
$page = $_GET['page'];

$postPage = $_POST['page'];
$pillar = $_POST['user_pillar'];
$date = $_POST['user_date'];
$duration = $_POST['user_duration'];
$quality = $_POST['user_quality'];
$notes = $_POST['user_notes'];

//Functions
function getLastEntryJSON(){
  require 'db/connect.php';

  $result = $db->query("SELECT * FROM personal.pillars_log ORDER BY id DESC LIMIT 1;")->fetch_object();

  echo json_encode($result);
}

function getDayJSON(){
  require 'db/connect.php';

  $result = $db->query("Select * FROM pillars_log WHERE event_date between '2015/03/26' and '2015/03/27';");
  

  $rows = array();

  while($r = $result->fetch_object()) { 
    $rows[] = $r;
  }

  echo json_encode($rows);
}

function newEntryJSON($pillar, $date, $duration, $quality, $notes){
  require 'db/connect.php';

  $db->query("INSERT INTO pillars_log (pillar,event_date,duration,quality,notes,entry_utc_timestamp) VALUES ('$pillar','$date','$duration','$quality','$notes',UTC_TIMESTAMP());");

  $result = $db->query("SELECT * FROM personal.pillars_log ORDER BY id DESC LIMIT 1;")->fetch_object();

  echo json_encode($result);
}

//Content
if($page == "lastEntry"){ getLastEntryJSON(); }
if($page == "day"){ getDayJSON(); }
if($postPage == "newEntry"){ newEntryJSON($pillar, $date, $duration, $quality, $notes); }
?>