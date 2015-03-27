<?php
//Variables
$page = $_GET['page'];

//Functions
function getIndexJSON(){
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

//Content
if($page == "index"){ getIndexJSON(); }
if($page == "day"){ getDayJSON(); }
?>