<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$array = json_decode($_POST['values']);
$id = $array[4];
if ($id == NULL) {
    $dbcon->query("INSERT INTO advance (
    adv_date,
    lorry_no,
    adv_amount,
    pay_mode
) VALUES (
    '" . strtotime($array[0]) . "',
    '$array[1]',
    '$array[2]',
    '$array[3]'
);");
    mysqli_close($dbcon);
} else {
    $check = $dbcon->query("SELECT * FROM advance where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $dbcon->query("UPDATE advance SET adv_date='" . strtotime($array[0]) . "',lorry_no='$array[1]',adv_amount='$array[2]',pay_mode='$array[3]' 
        where id='$id';");
        mysqli_close($dbcon);
    }
}
