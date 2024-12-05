<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$id = $_POST['id'];
$check = $dbcon->query("DELETE FROM expenses where id='$id';");
$dbcon->query("DELETE FROM load_charges WHERE expenses_id='$id';");
$dbcon->query("DELETE FROM diesel_charges WHERE expenses_id='$id';");
$dbcon->query("DELETE FROM rto_charges WHERE expenses_id='$id';");
$dbcon->query("DELETE FROM misc_charges WHERE expenses_id='$id';");

mysqli_close($dbcon);
