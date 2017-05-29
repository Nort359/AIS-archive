<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$password = $_POST[ 'checkPassword' ];
	$hash_password = $_POST[ 'password' ];

	if ( password_verify( $password, $hash_password ) )
		echo 'Ok';
	else
		echo 'Error';

?>
