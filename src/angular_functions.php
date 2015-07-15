<?php
/*
* Collect all Details from Angular HTTP Request.
*/
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

function getDataExplorerJSON($request){
  require_once 'db/connect.php';

  @$pillar = $request->pillar;
  @$minDuration = $request->minDuration;
  @$maxDuration = $request->maxDuration;
  @$quality = $request->quality;
  @$startDate = $request->startDate;
  @$endDate = $request->endDate;
  @$notes = $request->notes;
  $counter = 0;

  $sql = "SELECt * FROM pillars_log WHERE";
  if($pillar) {
    $sql .= " pillar = ? AND ";
  }
  if($minDuration && $maxDuration) {
    $sql .= " duration BETWEEN ? AND ? AND ";
  }
  elseif($minDuration && !$maxDuration) {
    $sql .= " duration >= ? AND ";
  }
  elseif(!$minDuration && $maxDuration) {
    $sql .= " duration <= ? AND ";
  }
  if($quality) {
    $sql .= "quality = ? AND ";
  }
  if($startDate == "ull" && $endDate == "ull"){

  }
  elseif($startDate && $endDate == "ull") {
    $sql .= "event_date >= ? AND ";
  }
  elseif($startDate == "ull" && $endDate) {
    $sql .= "event_date <= ? AND ";
  }
  elseif($startDate && $endDate) {
    $sql .= "event_date BETWEEN ? AND ? AND ";
  }
  if($notes) {
    $notes = "%" . $notes . "%";
    $sql .= "notes  LIKE ? AND";
  }
  $sql .= " 1=1";

  // echo json_encode($request);

  try {

    $result = $db->prepare($sql);
    if($pillar) {
      $counter++;
      $result->bindParam($counter,$pillar);
    }
    if($minDuration && $maxDuration) {
      $counter++;
      $result->bindParam($counter,$minDuration);
      $counter++;
      $result->bindParam($counter,$maxDuration);
    }
    elseif($minDuration && !$maxDuration) {
      $counter++;
      $result->bindParam($counter,$minDuration);
    }
    elseif(!$minDuration && $maxDuration) {
      $counter++;
      $result->bindParam($counter,$maxDuration);
    }
    if($quality) {
      $counter++;
      $result->bindParam($counter,$quality);
    }
    if($startDate == "ull" && $endDate == "ull"){

    }
    elseif($startDate && $endDate == "ull") {
      $counter++;
      $result->bindParam($counter,$startDate);
    }
    elseif($startDate == "ull" && $endDate) {
      $counter++;
      $result->bindParam($counter,$endDate);
    }
    elseif($startDate && $endDate) {
      $counter++;
      $result->bindParam($counter,$startDate);
      $counter++;
      $result->bindParam($counter,$endDate);
    }

    if($notes) {
      $counter++;
      $result->bindParam($counter,$notes);
    }
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

getDataExplorerJSON($request);
?>
