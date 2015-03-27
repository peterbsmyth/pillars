<?php
require 'db/connect.php';

//STORE POST REQUEST VARIABLES FROM FORM
$pillar = $_POST['user_pillar'];
$date = $_POST['user_date'];
$duration = $_POST['user_duration'];
$quality = $_POST['user_quality'];
$notes = $_POST['user_notes'];

//SEND MySQL INSERT STATEMENT
$db->query("INSERT INTO pillars_log (pillar,event_date,duration,quality,notes,entry_utc_timestamp) VALUES ('$pillar','$date','$duration','$quality','$notes',UTC_TIMESTAMP());");

$db->query("")


?>


