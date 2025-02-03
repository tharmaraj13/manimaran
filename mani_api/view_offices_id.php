<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$id = $_POST['id'];
$resp_status = new stdClass;
if ($id == 'undefined') {
    $resp->status = 'error1';
} else {
    $check = $dbcon->query("SELECT * FROM office_details where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $resp_status->status = 'ok';
        $resp_status->hname = $result['oname'];
        $resp_status->hplace = $result['onumber'];
        $resp_status->location = $result['location'];
    }
    else{
        $resp->status = 'error';
    }
}
mysqli_close($dbcon);
echo json_encode($resp_status);