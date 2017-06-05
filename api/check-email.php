<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$email = $_POST['checkEmail'];

	if (R::findOne( 'user', 'email = ?', [ $email ] ) > 0) {
		echo 'Error';
	} else {
		echo 'Ok';
	}

?>