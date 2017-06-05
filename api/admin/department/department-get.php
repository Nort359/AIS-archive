<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$department = R::findAll( 'department' );

	if ( $department > 0 )
		echo json_encode($department);
	else
		echo 'Erorr';

?>