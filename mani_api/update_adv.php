<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$array=$_POST['data'];
$dbcon->query("UPDATE lorry_details SET advance_amt='',advance_date='',commission='',loading_charge='',mamul='' where id='';");
mysqli_close($dbcon);