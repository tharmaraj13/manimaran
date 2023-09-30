<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$array = json_decode($_POST['values']);
$id = $array[4];
if ($id == NULL) {
    $dbcon->query("INSERT INTO maintenance (
    lm_date,
    lorry_no,
    odometer,
    services
) VALUES (
    '" . strtotime($array[0]) . "',
    '$array[1]',
    '$array[2]',
    '".json_encode($array[3])."'
);");
    mysqli_close($dbcon);
} else {
    $check = $dbcon->query("SELECT * FROM maintenance where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $dbcon->query("UPDATE maintenance SET lm_date='" . strtotime($array[0]) . "',lorry_no='$array[1]',odometer='$array[2]',services='".json_encode($array[3])."' 
        where id='$id';");
        mysqli_close($dbcon);
    }
}
