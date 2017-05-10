<?php

	require_once 'config.php';

	$email = $_POST['checkEmail'];

	if (R::findOne( 'user', 'email = ?', [ $email ] ) > 0) {
		echo 'Error';
	} else {
		echo 'Ok';
	}

?>