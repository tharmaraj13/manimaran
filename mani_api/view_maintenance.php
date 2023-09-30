<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
$services = new stdClass;
$check1 = $dbcon->query("SELECT * FROM services;");
if ($check1->num_rows > 0) {
    for ($i = 0; $i < $check1->num_rows; $i++) {
        $result1 = mysqli_fetch_assoc($check1);
        $services->{$result1['id']} = $result1['service'];
    }
}
$check = $dbcon->query("SELECT X.*,Y.number,Y.wheels
FROM maintenance X, lorry_no Y
WHERE X.lorry_no=Y.id
ORDER by lm_date DESC;");
if ($check->num_rows > 0) {
    for ($i = 0; $i < $check->num_rows; $i++) {
        $result = mysqli_fetch_assoc($check);
        $resp_status = new stdClass;
        $needed = '';
        $resp_status->id = $result['id'];
        $resp_status->lm_date = Date('Y-m-d', $result['lm_date']);
        $resp_status->lorry_no = $result['number'] . ' | ' . $result['wheels'];
        $resp_status->odometer = $result['odometer'];
        $service_used = json_decode($result['services']);
        foreach ($service_used as $service) {
            foreach ($service as $id => $value) {
                if ($value) {
                    $needed .= $services->{$id} . ' | ';
                }
            }
        }
        $resp_status->services = $needed;
        $response[] = $resp_status;
    }
}
echo json_encode($response);
mysqli_close($dbcon);
