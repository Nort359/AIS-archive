<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/delete_record_directory.php';

	$department_id = $_POST['expansionId'];

	//if ( R::findOne( 'user', 'department_id = ?', [ $department_id ] ) > 0 ) {
		//echo 'К этому отделу привязаны пользователи';
	//} else {
		if ( delete_current_record( 'expansion', $department_id ) )
			echo 'Ok';
		else
			echo 'Error';
	//}

?>