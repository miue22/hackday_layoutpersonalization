<?php
	require_once "define_header.php";

	$conn = mysqli_connect(db_host, db_id, db_pw, db_name);

	if(!$conn){
		echo "Mysql connect fail.";
	}

	session_start();
?>