<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/update_record_directory.php';

	$department_id = $_POST['id'];
	$department_title = $_POST['data'];

	echo update_record_and_answer('department', $department_title, $department_id);

?>