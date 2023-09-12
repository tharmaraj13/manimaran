<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

if($_POST['username']!=''){
include 'config.php';
$resp_status = new stdClass;

$name=$_POST['username'];
$password=$_POST['password'];

$check=$dbcon->query("SELECT * from users where username='$name' and password='$password';");
if($check->num_rows>0){
    $result=mysqli_fetch_assoc($check);

    $resp_status->status='ok';
    $resp_status->username=$result['username'];
    $resp_status->token=$result['token'];
    echo json_encode($resp_status);
}
else{
    $resp_status->status = 'error';
	$resp_status->errorcode = 'missingparameter';
	$resp_status->message = 'invalid request';
	$resp_status->debuginfo = 'kindly check request parameters';
    echo json_encode($resp_status);
}
mysqli_close($dbcon);
}