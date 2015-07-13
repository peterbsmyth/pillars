<?php
/*
* Collect all Details from Angular HTTP Request.
*/
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$pillar = $request->pillar;
@$minDuration = $request->minDuration;
@$maxDuration = $request->maxDuration;
@$quality = $request->quality;
@$startDate = $request->startDate;
@$endDate = $request->endDate;
@$notes = $request->notes;

function getDataExplorerJSON($pillar,$minDuration,$maxDuration,$quality,$startDate,$endDate,$notes){
  require_once 'db/connect.php';
  $notes = "%" . $notes . "%";

  try {
    $result = $db->prepare("SELECt * FROM pillars_log WHERE pillar = ? AND duration BETWEEN ? AND ? AND quality = ? AND event_date BETWEEN ? AND ? AND notes LIKE ?;");
    $result->bindParam(1,$pillar);
    $result->bindParam(2,$minDuration);
    $result->bindParam(3,$maxDuration);
    $result->bindParam(4,$quality);
    $result->bindParam(5,$startDate);
    $result->bindParam(6,$endDate);
    $result->bindParam(7,$notes);
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

getDataExplorerJSON($pillar,$minDuration,$maxDuration,$quality,$startDate,$endDate,$notes);
?>
