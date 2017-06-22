<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/add_record_directory.php';

	$department_title = $_POST['data'];
	echo add_record_and_answer('expansion', $department_title);

?>