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
    $check = $dbcon->query("SELECT * FROM advance where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $resp_status->status = 'ok';
        $resp_status->id = $result['id'];
        $resp_status->adv_date = Date('Y-m-d',$result['adv_date']);
        $resp_status->lorry_no = $result['lorry_no'];
        $resp_status->adv_amount = $result['adv_amount'];
        $resp_status->pay_mode = $result['pay_mode'];
    }
    else{
        $resp->status = 'error';
    }
}
mysqli_close($dbcon);
echo json_encode($resp_status);