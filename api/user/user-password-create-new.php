<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	function password_update( $table, $value, $id ) {
		$password = R::load( $table, $id );
		
		$password->password = password_hash( $value, PASSWORD_DEFAULT );

		return R::store( $password );
	}

	if ( !empty( $_POST ) ) {
		$user_email = $_POST[ 'email' ];
		$new_password = $_POST[ 'newPassword' ];

		$user = R::findOne( 'user', 'email = ?', [ $user_email ] );

		if ( password_update( 'user', $new_password, $user->id ) )
			echo 'Ok';
		else
			echo 'Error';
	} else
		echo 'Данные не были переданы';

?>