<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
$check = $dbcon->query("SELECT X.*,Y.number,Y.wheels
FROM lorry_details X, lorry_no Y
WHERE X.lorry_no=Y.id and X.advance_amt!='' and X.payment_amt=''
ORDER by id DESC;");
if ($check->num_rows > 0) {
    for ($i = 0; $i < $check->num_rows; $i++) {
        $result = mysqli_fetch_assoc($check);
        $resp_status = new stdClass;
        $resp_status->id = $result['id'];
        $resp_status->load_date = Date('Y-m-d',$result['load_date']);
        $resp_status->lorry_no = $result['number'].' | '.$result['wheels'];
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

        $response[] = $resp_status;
    }
}
echo json_encode($response);
mysqli_close($dbcon);
