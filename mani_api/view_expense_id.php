<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$id = $_POST['id'];
$resp_status = new stdClass;

$check = $dbcon->query("SELECT 
    lorry_no,from_date,to_date,
    driver1,driver2,start_km,end_km,diesel_amount,
    pc_charge,bill,adv_amount,office_commission
    FROM expenses where id='$id';");
if ($check->num_rows > 0) {
    $data = mysqli_fetch_object($check);
    $resp_status->status = 'ok';
    $resp_status->data = $data;
    $resp_status->data->from_date = Date('Y-m-d', $data->from_date);
    $resp_status->data->to_date = Date('Y-m-d', $data->to_date);
    $check1 = $dbcon->query("SELECT 
    `date`,qty,amount
    FROM diesel_charges where expenses_id='$id';");
    $resp_status->dieselRows = [];
    while ($row = mysqli_fetch_object($check1)) {
        $row->date = Date('Y-m-d', $row->date);
        $resp_status->dieselRows[] = $row;
    }
    $check1 = $dbcon->query("SELECT 
    `location`,up,down
    FROM rto_charges where expenses_id='$id';");
    $resp_status->rtoRows = [];
    while ($row = mysqli_fetch_object($check1)) {
        $resp_status->rtoRows[] = $row;
    }
    $check1 = $dbcon->query("SELECT 
    `particular`,amount
    FROM misc_charges where expenses_id='$id';");
    $resp_status->miscRows = [];
    while ($row = mysqli_fetch_object($check1)) {
        $resp_status->miscRows[] = $row;
    }
} else {
    $resp_status->status = 'error';
}
mysqli_close($dbcon);
echo json_encode($resp_status);
