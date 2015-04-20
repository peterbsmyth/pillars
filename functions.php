<?php
//Variables
$content = $_GET['content'];
$test = $_GET['id'];
$day1 = $_GET['newday_user_date1'];
$day2 = $_GET['newday_user_date2'];
$startDay = $_GET['startDay'];
$endDay = $_GET['endDay'];

$postContent = $_POST['content'];
$pillar = $_POST['user_pillar'];
$date = $_POST['user_date'];
$duration = $_POST['user_duration'];
$quality = $_POST['user_quality'];
$notes = $_POST['user_notes'];
$id = $_POST['user_id'];

//Functions
function getLastEntryJSON(){
  require_once 'db/connect.php';

  try{
    $result = $db->prepare("SELECT * FROM personal.pillars_log ORDER BY id DESC LIMIT 1;");
    $result->execute();
  } catch (Exception $e){
    echo $e->getMessage();
    die();
  }

  $send = $result->fetch(PDO::FETCH_ASSOC);

  echo json_encode($send);
}


function getDayJSON($startDay, $endDay){
  require_once 'db/connect.php';

  try {
     $result = $db->prepare("Select * FROM pillars_log WHERE event_date between ? and ?;");
     $result->bindParam(1, $startDay);
     $result->bindParam(2, $endDay);
     $result->execute();
  } catch (Exception $e){
    echo $e->getMessage();
    die();
  }


  $rows = array();

  while($r = $result->fetch(PDO::FETCH_ASSOC)) {
    $rows[] = $r;
  }

  echo json_encode($rows);
}

// function getDayJSON(){
//   require_once 'db/connect.php';
//
//   try {
//      $result = $db->prepare("Select * FROM pillars_days;");
//      $result->execute();
//   } catch (Exception $e){
//     echo $e->getMessage();
//     die();
//   }


  $rows = array();

  while($r = $result->fetch(PDO::FETCH_ASSOC)) {
    $rows[] = $r;
  }

  echo json_encode($rows);
}


function addDay($date,$quality,$notes){
  require_once 'db/connect.php';

  try {
   $result = $db->prepare("INSERT INTO pillars_days (event_date,quality,notes,entry_utc_timestamp) VALUES (?,?,?,UTC_TIMESTAMP());");
   $result->bindParam(1, $date);
   $result->bindParam(2, $quality);
   $result->bindParam(3, $notes);
   $result->execute();
  } catch (Exception $e){
    echo $e->getMessage();
    die();
  }

  echo json_encode($date);
}

function newEntryJSON($pillar, $date, $duration, $quality, $notes){
  require_once('db/connect.php');

  try{
    $result = $db->prepare("INSERT INTO pillars_log (pillar,event_date,duration,quality,notes,entry_utc_timestamp) VALUES (?,?,?,?,?,UTC_TIMESTAMP());");
    $result->bindParam(1, $pillar);
    $result->bindParam(2, $date);
    $result->bindParam(3, $duration);
    $result->bindParam(4, $quality);
    $result->bindParam(5, $notes);
    $result->execute();

    $result = $db->prepare("SELECT * FROM personal.pillars_log ORDER BY id DESC LIMIT 1;");
    $result->execute();
  } catch(Exception $e){
    echo $e->getMessage();
     die();
  }

  $newEntry = $result->fetch(PDO::FETCH_ASSOC);

  echo json_encode($newEntry);
}


function newDay($day1,$day2){
  require_once('db/connect.php');
  try {
     $result = $db->prepare("Select * FROM pillars_log WHERE event_date between ? and ?;");
     $result->bindParam(1,$day1);
     $result->bindParam(2,$day2);
     $result->execute();
  } catch (Exception $e){
    echo $e->getMessage();
    die();
  }


  $rows = array();


  while($r = $result->fetch(PDO::FETCH_ASSOC)) {
    $rows[] = $r;
    return json_encode($r);
  }

  echo json_encode($rows);

}

function updateEntry($id, $duration, $pillar){
  require_once('db/connect.php');
  try {
     $result = $db->prepare("UPDATE pillars_log SET duration = ?, pillar = ? WHERE id = ?");
     $result->bindParam(1,$duration);
     $result->bindParam(2,$pillar);
     $result->bindParam(3,$id);
     $result->execute();

     $result1 = $db->prepare("SELECT * FROM pillars_log WHERE id = ?");
     $result1->bindParam(1,$id);
     $result1->execute();
  } catch (Exception $e){
    echo $e->getMessage();
    die();
  }

  $updatedDuration = $result1->fetch(PDO::FETCH_ASSOC);

  echo json_encode($updatedDuration);

}

//Content
if($content == "lastEntry"){ getLastEntryJSON(); }
if($content == "today"){ getDayJSON($startDay,$endDay); }
if($content == "days"){ getDayJSON(); }
if($postContent == "newEntry"){ newEntryJSON($pillar, $date, $duration, $quality, $notes); }
if($content == "newDay"){newDay($day1,$day2);}
if($postContent == "addDay"){addDay($date,$quality,$notes);}
if($postContent == "updateNotes") {updateNotes($id, $notes);}
if($postContent == "updatePillar") {updatePillar($id, $pillar);}
if($postContent == "updateDuration") {updateDuration($id, $duration);}
if($postContent == "updateEntry") {updateEntry($id, $duration, $pillar);}
?>
