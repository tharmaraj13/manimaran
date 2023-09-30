<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$service = $_POST['service'];
$id = $_POST['id'];

$resp_status = new stdClass;
if ($id == 'undefined') {
    $check = $dbcon->query("SELECT * from services where service='$service';");
    if ($check->num_rows > 0) {
        $resp_status->status = 'error';
        $resp_status->message = 'Already Exist';
    } else {
        $dbcon->query("INSERT INTO services (service) VALUES ('$service');");
        $resp_status->status = 'ok';
        $resp_status->id = $dbcon->insert_id;
        $resp_status->service = $service;
    }
    mysqli_close($dbcon);
} else {
    $dbcon->query("UPDATE services SET service='$service' where id='$id';");
    $resp_status->status = 'ok';
    $resp_status->id = $id;
    $resp_status->service = $service;
    mysqli_close($dbcon);
}
echo json_encode($resp_status);