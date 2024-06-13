<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$id = $_POST['id'];
$resp_status = new stdClass;
$check1 = $dbcon->query("SELECT * FROM `cities` GROUP BY `state` ORDER by `state` ASC;");
$data = [];
if ($check1->num_rows > 0) {
    for ($i = 0; $i < $check1->num_rows; $i++) {
        $result1 = mysqli_fetch_assoc($check1);
        $data[] = $result1['state'];
    }
}
if ($id == 'undefined') {
    $resp_status->status = 'error1';
    $resp_status->data = $data;
    mysqli_close($dbcon);
} else {
    $check = $dbcon->query("SELECT * FROM cities where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $resp_status->status = 'ok';
        $resp_status->hname = $result['city'];
        $resp_status->hplace = $result['state'];
        $resp_status->data = $data;
    } else {
        $resp_status->status = 'error';
    }
    mysqli_close($dbcon);
}
echo json_encode($resp_status);
