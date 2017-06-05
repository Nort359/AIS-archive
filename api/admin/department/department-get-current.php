<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$department_id = $_POST['id'];
	$department = R::findOne( 'department', 'id = ?', [ $department_id ] );

	if ( $department > 0 )
		echo json_encode($department);
	else
		echo 'Error';

?>