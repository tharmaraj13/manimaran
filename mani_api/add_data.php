<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$array=json_decode($_POST['values']);
$id = $array[17];
if ($id == NULL) {
$dbcon->query("INSERT INTO lorry_details (
    load_date,
    lorry_no,
    `from`,
    `to`,
    load_type,
    `weight`,
    freight,
    advance_amt,
    advance_date,
    commission,
    loading_charge,
    mamul,
    delivery_date,
    payment_amt,
    payment_date,
    account_name,
    advance_paid,
    office_no,
    remarks,
    other_amt,
    account_name_ad
) VALUES (
    '".strtotime($array[0])."',
    '$array[1]',
    '$array[2]',
    '$array[3]',
    '$array[4]',
    '$array[5]',
    '$array[6]',
    '$array[7]',
    '".strtotime($array[8])."',
    '$array[9]',
    '$array[10]',
    '$array[11]',
    '".strtotime($array[12])."',
    '$array[13]',
    '".strtotime($array[14])."',
    '$array[15]',
    '$array[16]',
    '$array[18]',
    '".addslashes($array[19])."',
    '$array[20]',
    '$array[21]'
);");
mysqli_close($dbcon);
}
else {
    $check = $dbcon->query("SELECT * FROM lorry_details where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $dbcon->query("UPDATE lorry_details SET load_date='".strtotime($array[0])."',lorry_no='$array[1]',`from`='$array[2]',`to`='$array[3]',load_type='$array[4]',`weight`='$array[5]',
    freight='$array[6]',advance_amt='$array[7]',advance_date='".strtotime($array[8])."',commission='$array[9]',
    loading_charge='$array[10]',mamul='$array[11]',delivery_date='".strtotime($array[12])."',payment_amt='$array[13]',payment_date='".strtotime($array[14])."',
    account_name='$array[15]',advance_paid='$array[16]',office_no='$array[18]',remarks='".addslashes($array[19])."',other_amt='$array[20]',account_name_ad='$array[21]'
    where id='$id';");
        mysqli_close($dbcon);
    }
}