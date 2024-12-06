<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
header('Content-Type: application/json');

include 'config.php';
$array = json_decode($_POST['values']);

$lorryNo = $array[0];
$response_stat = new stdClass;

$check = $dbcon->query("SELECT * FROM `expenses` where lorry_no='$lorryNo' ORDER by to_date DESC LIMIT 1;");
if ($check->num_rows > 0) {
    while ($row = mysqli_fetch_object($check)) {
        $response_stat->status = "ok";
        $response_stat->from_date = Date('Y-m-d', $row->to_date + 24 * 3600);
        $response_stat->start_km = $row->end_km;
    }
} else {
    $response_stat->status = "error";
}

echo json_encode($response_stat);
mysqli_close($dbcon);
