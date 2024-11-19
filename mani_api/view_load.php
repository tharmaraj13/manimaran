<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$array = json_decode($_POST['values']);

$lorryNo = $array[0];
$fromDate = $array[1];
$toDate = $array[2];
$response = [];

$check = $dbcon->query("SELECT * FROM lorry_details where lorry_no='$lorryNo' AND
    load_date  BETWEEN '" . strtotime($fromDate) . "' AND '" . strtotime($toDate) . "';");
if ($check->num_rows > 0) {
    for ($i = 0; $i < $check->num_rows; $i++) {
        $result = mysqli_fetch_assoc($check);
        $resp_status = new stdClass;

        $resp_status->date = Date('Y-m-d', $result['load_date']);
        $resp_status->startLocation = $result['from'];
        $resp_status->endLocation = $result['to'];
        $resp_status->load = $result['load_type'];
        $resp_status->ton = (float)$result['weight'];
        $resp_status->freight = (float)$result['freight'];
        $resp_status->commission = (float)$result['commission'];
        $resp_status->loadCharge = (float)$result['loading_charge'];
        $resp_status->unloadCharge = '';

        $response[] = $resp_status;
    }
}
echo json_encode($response);
mysqli_close($dbcon);
