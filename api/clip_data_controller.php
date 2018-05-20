<?php
	include '../config/db_config.php';
	include '../config/db_lib.php';
	
	$method = $_SERVER['REQUEST_METHOD'];
	
	if ('GET' === $method) {
		//Mapping
		foreach($_GET as $key=>$value)
			${$key} = $value; //유동변수

		//Validation
		if(validation(V_EMPTY, $start, $num)){
			http_response_code(400);
		    echo "EmptyForm";
			exit;
		}

		$table = "clip_data";
		$sql = "SELECT * FROM {$table} LIMIT {$start}, {$num}";
		$result = getDB($conn, $sql, "get");

		if(!$result){
			http_response_code(500);
		    echo "FailToRunSql";
		    exit;
		}

		echo JSON("Success", $result);
	}
	
	else if ('POST' === $method) {}
	
	else if ('PUT' === $method) {}

	else if ('DELETE' === $method) {}

?>