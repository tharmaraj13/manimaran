<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$resp_status = new stdClass;

$check = $dbcon->query("SELECT 
    X.*,Y.number,Y.wheels
    FROM expenses X
    LEFT JOIN lorry_no Y ON X.lorry_no=Y.id
    ORDER by X.from_date DESC;");
if ($check->num_rows > 0) {
    $resp_status->status = 'ok';
    $resp_status->data = [];
    while ($row = mysqli_fetch_object($check)) {
        $row->from_date = Date('Y-m-d', $row->from_date);
        $row->to_date = Date('Y-m-d', $row->to_date);
        $resp_status->data[] = $row;
    }
} else {
    $resp_status->status = 'error';
    $resp_status->data = [];
}
mysqli_close($dbcon);
echo json_encode($resp_status);
