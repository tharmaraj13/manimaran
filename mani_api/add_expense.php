<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$array = json_decode($_POST['values'], true);
$id = $array[1];
$data = $array[0];

// Remove array fields
$loadRows = $data['loadRows'];
$dieselRows = $data['dieselRows'];
$rtoRows = $data['rtoRows'];
$miscRows = $data['miscRows'];

// Remove array fields from the main data for insertion
unset($data['loadRows']);
unset($data['dieselRows']);
unset($data['rtoRows']);
unset($data['miscRows']);

$data['from_date'] = strtotime($data['from_date']);
$data['to_date'] = strtotime($data['to_date']);

if ($id == NULL) {
    // Prepare the SQL query dynamically for the main table
    $columns = implode(", ", array_keys($data)); // Get column names dynamically
    $values = "'" . implode("', '", array_values($data)) . "'"; // Get corresponding values

    $sql = "INSERT INTO expenses ($columns) VALUES ($values)";

    $dbcon->query($sql);
    $last_id = $dbcon->insert_id;
    foreach ($loadRows as $row) {
        $load_columns = implode(", ", array_keys($row));  // Dynamically fetch keys
        $load_values = "'" . implode("', '", array_values($row)) . "'";  // Dynamically fetch values
        $load_sql = "INSERT INTO load_charges (expenses_id, $load_columns) VALUES ($last_id, $load_values)";
        $dbcon->query($load_sql);
    }
    foreach ($dieselRows as &$row) {
        $row['date'] = strtotime($row['date']);
        $load_columns = implode(", ", array_keys($row));  // Dynamically fetch keys
        $load_values = "'" . implode("', '", array_values($row)) . "'";  // Dynamically fetch values
        $load_sql = "INSERT INTO diesel_charges (expenses_id, $load_columns) VALUES ($last_id, $load_values)";
        $dbcon->query($load_sql);
    }
    foreach ($rtoRows as $row) {
        $load_columns = implode(", ", array_keys($row));  // Dynamically fetch keys
        $load_values = "'" . implode("', '", array_values($row)) . "'";  // Dynamically fetch values
        $load_sql = "INSERT INTO rto_charges (expenses_id, $load_columns) VALUES ($last_id, $load_values)";
        $dbcon->query($load_sql);
    }
    foreach ($miscRows as $row) {
        $load_columns = implode(", ", array_keys($row));  // Dynamically fetch keys
        $load_values = "'" . implode("', '", array_values($row)) . "'";  // Dynamically fetch values
        $load_sql = "INSERT INTO misc_charges (expenses_id, $load_columns) VALUES ($last_id, $load_values)";
        $dbcon->query($load_sql);
    }
    mysqli_close($dbcon);
} else {
    $check = $dbcon->query("SELECT id FROM expenses where id='$id';");
    if ($check->num_rows > 0) {
        // Prepare the SQL UPDATE query dynamically for the main table
        $set = "";
        foreach ($data as $key => $value) {
            $set .= "$key = '" . $value . "', ";
        }
        // Remove the trailing comma and space
        $set = rtrim($set, ", ");

        // Prepare the SQL query with the WHERE condition
        $sql = "UPDATE expenses SET $set WHERE id = '$id'";

        $dbcon->query($sql);
        $dbcon->query("DELETE FROM load_charges WHERE expenses_id='$id';");
        foreach ($loadRows as $row) {
            $load_columns = implode(", ", array_keys($row));  // Dynamically fetch keys
            $load_values = "'" . implode("', '", array_values($row)) . "'";  // Dynamically fetch values
            $load_sql = "INSERT INTO load_charges (expenses_id, $load_columns) VALUES ($id, $load_values)";
            $dbcon->query($load_sql);
        }
        $dbcon->query("DELETE FROM diesel_charges WHERE expenses_id='$id';");
        foreach ($dieselRows as &$row) {
            $row['date'] = strtotime($row['date']);
            $load_columns = implode(", ", array_keys($row));  // Dynamically fetch keys
            $load_values = "'" . implode("', '", array_values($row)) . "'";  // Dynamically fetch values
            $load_sql = "INSERT INTO diesel_charges (expenses_id, $load_columns) VALUES ($id, $load_values)";
            $dbcon->query($load_sql);
        }
        $dbcon->query("DELETE FROM rto_charges WHERE expenses_id='$id';");
        foreach ($rtoRows as $row) {
            $load_columns = implode(", ", array_keys($row));  // Dynamically fetch keys
            $load_values = "'" . implode("', '", array_values($row)) . "'";  // Dynamically fetch values
            $load_sql = "INSERT INTO rto_charges (expenses_id, $load_columns) VALUES ($id, $load_values)";
            $dbcon->query($load_sql);
        }
        $dbcon->query("DELETE FROM misc_charges WHERE expenses_id='$id';");
        foreach ($miscRows as $row) {
            $load_columns = implode(", ", array_keys($row));  // Dynamically fetch keys
            $load_values = "'" . implode("', '", array_values($row)) . "'";  // Dynamically fetch values
            $load_sql = "INSERT INTO misc_charges (expenses_id, $load_columns) VALUES ($id, $load_values)";
            $dbcon->query($load_sql);
        }
    }
    mysqli_close($dbcon);
}
