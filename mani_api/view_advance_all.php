<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
$lorry=$_POST['lorry_no']=='' ? '' : 'and X.lorry_no="'.$_POST['lorry_no'].'"';
$fdate= strtotime($_POST['fdate']);
$tdate=strtotime($_POST['tdate']);

$check = $dbcon->query("SELECT X.*,Y.number,Y.wheels
FROM advance X, lorry_no Y
WHERE X.lorry_no=Y.id
and X.adv_date<='$tdate' and X.adv_date>='$fdate'
".$lorry."
ORDER by adv_date DESC;");
if ($check->num_rows > 0) {
    for ($i = 0; $i < $check->num_rows; $i++) {
        $result = mysqli_fetch_assoc($check);
        $resp_status = new stdClass;
        $resp_status->id = $result['id'];
        $resp_status->adv_date = Date('Y-m-d',$result['adv_date']);
        $resp_status->lorry_no = $result['number'].' | '.$result['wheels'];
        $resp_status->adv_amount = $result['adv_amount'];
        $resp_status->pay_mode = $result['pay_mode'];

        $response[] = $resp_status;
    }
}
echo json_encode($response);
mysqli_close($dbcon);
