<?php
	include '../config/db_config.php';
	include '../config/db_lib.php';
	
	$method = $_SERVER['REQUEST_METHOD'];
	
	if ('GET' === $method) {
		//Mapping
		foreach($_GET as $key=>$value)
			${$key} = $value; //유동변수

		//Validation
		if(validation(V_EMPTY, $id)){
			http_response_code(400);
		    echo "EmptyForm";
			exit;
		}

		$table = "member";
		$sql = "SELECT * FROM {$table} WHERE id = '{$id}'";
		$result = getDB($conn, $sql, "get");

		if(!$result){
			http_response_code(500);
		    echo "FailToRunSql";
		    exit;
		}

		echo JSON("Success", $result);
	}
	
	else if ('POST' === $method) {}
	
	else if ('PUT' === $method) {
	    parse_str(file_get_contents('php://input'), $_PUT);

	    //Mapping
		foreach($_PUT as $key=>$value)
			${$key} = $value;

		//Validation
		if(validation(V_EMPTY, $id, $custom)){
			http_response_code(400);
		    echo "EmptyForm";
			exit;
		}

		$table = "member";
		$value = "custom = '{$custom}'";
		$sql = "UPDATE {$table} SET {$value} WHERE id = '{$id}'";
		
		$result = getDB($conn, $sql);

		if(!$result){
			http_response_code(500);
		    echo "FailToRunSql";
		    exit;
		}
		echo "Success";
	}

	else if ('DELETE' === $method) {}

?>