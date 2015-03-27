<?php
require 'db/connect.php';
//PHP PSEUDOCODE


//STORE POST REQUEST VARIABLES FROM FORM
$pillar = $_POST['user_pillar'];
$date = $_POST['user_date'];
$quality = $_POST['user_quality'];
$notes = $_POST['user_notes'];

//PROCESS AM/PM Modifier
// if ($pmflag == true){
//   $date = 
// }

//CONNECT TO DATABASE

$db->query("INSERT INTO pillars_pillars (pillar,event_date,quality,notes,entry_utc_timestamp) VALUES ('$pillar','$date','$quality','$notes',UTC_TIMESTAMP());");

?>

<html>
<body>
  <?php echo $quality; ?>
</body>
</html>
