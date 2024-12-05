<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
header('Content-Type: application/json');

include 'config.php';
$array = json_decode($_POST['values']);

$lorryNo = $array[0];
$fromDate = $array[1];
$toDate = $array[2];
$id = $array[3];
$response = [];

if ($id == NULL) {
    $check = $dbcon->query("SELECT X.*, Z.taxRate
        FROM lorry_details X
        LEFT JOIN lorry_no Z ON X.lorry_no = Z.id
        where X.lorry_no='$lorryNo' AND
        X.load_date  BETWEEN '" . strtotime($fromDate) . "' AND '" . strtotime($toDate) . "'
        ORDER by X.load_date ASC;");
    if ($check->num_rows > 0) {
        for ($i = 0; $i < $check->num_rows; $i++) {
            $result = mysqli_fetch_assoc($check);
            $resp_status = new stdClass;

            $resp_status->id = $result['id'];
            $resp_status->taxRate = (float)$result['taxRate'];
            $resp_status->date = Date('Y-m-d', $result['load_date']);
            $resp_status->startLocation = $result['from'];
            $resp_status->endLocation = $result['to'];
            $resp_status->load = $result['load_type'];
            $resp_status->ton = (float)$result['weight'];
            $resp_status->freight = (float)$result['freight'];
            $resp_status->commission = (float)$result['commission'];
            $resp_status->loadCharge = (float)$result['loading_charge'];
            $resp_status->unloadCharge = 0;

            $response[] = $resp_status;
        }
    }
} else {
    $check = $dbcon->query("SELECT X.*,Y.loading_charge as loadCharge, Y.unloading_charge as unloadCharge, Z.taxRate
        FROM lorry_details X
        LEFT JOIN load_charges Y ON X.id = Y.lorry_details_id AND expenses_id='$id'
        LEFT JOIN lorry_no Z ON X.lorry_no = Z.id
        where X.lorry_no='$lorryNo' AND
        X.load_date  BETWEEN '" . strtotime($fromDate) . "' AND '" . strtotime($toDate) . "'
        ORDER by X.load_date ASC;");
    if ($check->num_rows > 0) {
        for ($i = 0; $i < $check->num_rows; $i++) {
            $result = mysqli_fetch_assoc($check);
            $resp_status = new stdClass;

            $resp_status->id = $result['id'];
            $resp_status->taxRate = (float)$result['taxRate'];
            $resp_status->date = Date('Y-m-d', $result['load_date']);
            $resp_status->startLocation = $result['from'];
            $resp_status->endLocation = $result['to'];
            $resp_status->load = $result['load_type'];
            $resp_status->ton = (float)$result['weight'];
            $resp_status->freight = (float)$result['freight'];
            $resp_status->commission = (float)$result['commission'];
            $resp_status->loadCharge = $result['loadCharge'] ? (float)$result['loadCharge'] : (float)$result['loading_charge'];
            $resp_status->unloadCharge = (float)$result['unloadCharge'];

            $response[] = $resp_status;
        }
    }
}

echo json_encode($response);
mysqli_close($dbcon);
