<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/check_record_directody.php';

	$department_title = $_POST['data'];
	echo check_record_directody('expansion', $department_title);

?>