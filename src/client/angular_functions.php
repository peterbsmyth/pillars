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

  if($notes){
    $notes = "%" . $notes . "%";
  }

  //Begin dataMySQL
  $dataSQL = "SELECt * FROM pillars_log WHERE";
  if($pillar) {
    $dataSQL .= " pillar = ? AND ";
  }
  if($minDuration && $maxDuration) {
    $dataSQL .= " duration BETWEEN ? AND ? AND ";
  }
  elseif($minDuration && !$maxDuration) {
    $dataSQL .= " duration >= ? AND ";
  }
  elseif(!$minDuration && $maxDuration) {
    $dataSQL .= " duration <= ? AND ";
  }
  if($quality) {
    $dataSQL .= " quality = ? AND ";
  }
  if($startDate == "ull" && $endDate == "ull"){

  }
  elseif($startDate && $endDate == "ull") {
    $dataSQL .= " event_date >= ? AND ";
  }
  elseif($startDate == "ull" && $endDate) {
    $dataSQL .= " event_date <= ? AND ";
  }
  elseif($startDate && $endDate) {
    $dataSQL .= " event_date BETWEEN ? AND ? AND ";
  }

  if($notes) {
    $dataSQL .= " notes LIKE ? AND ";
  }

  $dataSQL .= " 1=1";

  try {
    $counter = 0;
    $result = $db->prepare($dataSQL);
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

    if ($notes) {
      $counter++;
      $result->bindParam($counter,$notes);
    }

    $result->execute();
  } catch (Exception $e){
    echo $dataSql;
    echo $e;
    echo $e->getMessage();
    die();
  }

  $data = array();

  while($r = $result->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $r;
  }
  //end data MySQL

  //Begin stats MySQL

  $statsSQL = "SELECt SEC_TO_TIME(SUM(TIME_TO_SEC(duration))) AS total_duration FROM pillars_log WHERE";
  if($pillar) {
    $statsSQL .= " pillar = ? AND ";
  }
  if($minDuration && $maxDuration) {
    $statsSQL .= " duration BETWEEN ? AND ? AND ";
  }
  elseif($minDuration && !$maxDuration) {
    $statsSQL .= " duration >= ? AND ";
  }
  elseif(!$minDuration && $maxDuration) {
    $statsSQL .= " duration <= ? AND ";
  }
  if($quality) {
    $statsSQL .= "quality = ? AND ";
  }
  if($startDate == "ull" && $endDate == "ull"){

  }
  elseif($startDate && $endDate == "ull") {
    $statsSQL .= " event_date >= ? AND ";
  }
  elseif($startDate == "ull" && $endDate) {
    $statsSQL .= " event_date <= ? AND ";
  }
  elseif($startDate && $endDate) {
    $statsSQL .= " event_date BETWEEN ? AND ? AND ";
  }

  if($notes) {
    $statsSQL .= " notes LIKE ? AND ";
  }
  $statsSQL .= " 1=1";

  try {
    $counter = 0;
    $result = $db->prepare($statsSQL);
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

    if ($notes) {
      $counter++;
      $result->bindParam($counter,$notes);
    }

    $result->execute();
  } catch (Exception $e){
    echo $e;
    echo $e->getMessage();
    die();
  }

  $stats = $result->fetch(PDO::FETCH_ASSOC);

  $response = (object) ['data' => $data, 'stats' => $stats];

  echo json_encode($response);
}

getDataExplorerJSON($request);
?>
