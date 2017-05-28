<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/delete_record_directory.php';

	$department_id = $_POST['departmentId'];

	if ( delete_current_record( 'department', $department_id ) )
		echo 'Ok';
	else
		echo 'Error';

?>