<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$user_id = $_POST[ 'userId' ];

	$user = R::load( 'user', $user_id );
		
	$user->admin = 0;

	R::store( $user );

	echo 'Ok';

?>