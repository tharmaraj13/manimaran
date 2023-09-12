<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$hname = $_POST['hname'];
$hplace = $_POST['hplace'];
$id = $_POST['id'];

$resp_status = new stdClass;
if ($id == 'undefined') {
    $check = $dbcon->query("SELECT * from cities where city='$hname' and state='$hplace';");
    if ($check->num_rows > 0) {
        $resp_status->status = 'error';
        $resp_status->message = 'Already Exist';
    } else {
        $dbcon->query("INSERT INTO cities (city,state) VALUES ('$hname','$hplace');");
        $resp_status->status = 'ok';
        $resp_status->id = $dbcon->insert_id;
        $resp_status->name = $hname;
        $resp_status->place = $hplace;
    }
    mysqli_close($dbcon);
} else {
    $dbcon->query("UPDATE cities SET city='$hname', state='$hplace' where id='$id';");
    $resp_status->status = 'ok';
    $resp_status->id = $id;
    $resp_status->name = $hname;
    $resp_status->place = $hplace;
    mysqli_close($dbcon);
}
echo json_encode($resp_status);