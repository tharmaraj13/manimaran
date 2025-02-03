<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$id = $_POST['id'];
$resp_status = new stdClass;
if ($id == 'undefined') {
    $resp_status->status = 'error1';
} else {
    $check = $dbcon->query("SELECT * FROM lorry_details where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $resp_status->status = 'ok';
        $resp_status->id = $result['id'];
        $resp_status->load_date = Date('Y-m-d',$result['load_date']);
        $resp_status->lorry_no = $result['lorry_no'];
        $resp_status->from = $result['from'];
        $resp_status->to = $result['to'];
        $resp_status->load_type = $result['load_type'];
        $resp_status->weight = $result['weight'];
        $resp_status->freight = $result['freight'];
        $resp_status->advance_amt = $result['advance_amt'];
        $resp_status->advance_paid = $result['advance_paid'];
        $resp_status->advance_date = $result['advance_date']=='' ? '': Date('Y-m-d',$result['advance_date']);
        $resp_status->commission = $result['commission'];
        $resp_status->loading_charge = $result['loading_charge'];
        $resp_status->mamul = $result['mamul'];
        $resp_status->delivery_date = $result['delivery_date']=='' ? '': Date('Y-m-d',$result['delivery_date']);
        $resp_status->payment_amt = $result['payment_amt'];
        $resp_status->payment_date = $result['payment_date']=='' ? '': Date('Y-m-d',$result['payment_date']);
        $resp_status->account_name = $result['account_name'];
        $resp_status->office_no = $result['office_no'];
        $resp_status->other_amt = $result['other_amt'];
        $resp_status->account_name_ad = $result['account_name_ad'];
        $resp_status->remarks = stripslashes($result['remarks']);
    } else {
        $resp_status->status = 'error';
    }
}
mysqli_close($dbcon);
echo json_encode($resp_status);