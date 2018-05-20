<?php
	function getDB($conn, $sql, $type=""){
		$result = mysqli_query($conn, $sql);
		
		if($type === 'get' && $result){
			$row = mysqli_fetch_all($result, MYSQLI_ASSOC);
			return $row;
		}

		return $result;
	}

	function JSON($message, $data=[]){
		return json_encode(array('message' => $message, 'data' => $data));
	}

	function validation($type="") {
		if($type === "empty"){
			for ( $param = 1; $param < func_num_args(); $param++ ){
				$temp = func_get_arg($param);
				if(!isset($temp))
					return $param;
			}
			return "";
		}
		else if($type === "numeric"){
			for ( $param = 1; $param < func_num_args(); $param++ ){
				$temp = func_get_arg($param);
				if(!is_numeric($temp))
					return $param;
			}
			return "";
		}
		else
			return "WrongType";
	}

?>