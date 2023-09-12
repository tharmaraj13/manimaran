<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$check1 = $dbcon->query("SELECT `state` FROM cities ORDER by `state` ASC;");
$data = [];
if ($check1->num_rows > 0) {
    for ($i = 0; $i < $check1->num_rows; $i++) {
        $result1 = mysqli_fetch_assoc($check1);
        $data[] = $result1['state'];
    }
}

mysqli_close($dbcon);
echo json_encode($data);
