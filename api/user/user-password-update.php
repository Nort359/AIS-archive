<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	function password_update( $table, $value, $id ) {
		$password = R::load( $table, $id );
		
		$password->password = password_hash( $value, PASSWORD_DEFAULT );

		return R::store( $password );
	}

	$user_id = $_POST[ 'userId' ];
	$password = $_POST[ 'userPassword' ];

	if ( !empty( $_POST ) ) {
		if ( password_update( 'user', $password, $user_id ) )
			echo 'Ok';
		else
			echo 'Error';
	} else
		echo 'Данные не были переданы';

?>