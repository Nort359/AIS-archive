<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/delete_record_directory.php';

	$position_id = $_POST['positionId'];

	if ( R::findOne( 'user', 'position_id = ?', [ $position_id ] ) > 0 ) {
		echo 'К этой должности привязаны пользователи';
	} else {
		if ( delete_current_record( 'position', $position_id ) )
			echo 'Ok';
		else
			echo 'Error';
	}

?>