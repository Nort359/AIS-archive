<?php

	session_start();

	require_once 'config.php';

	$email = $_POST['userEmail'];
	$password = $_POST[ 'userPassword' ];

	$user = R::findOne( 'user', 'email = ?', [ $email ] );

	if ($user > 0) {
		if (password_verify($password, $user->password)) {
			$_SESSION['userData'] = $user;
			
			echo json_encode($user);
		} else {
			echo 'Неверный пароль';
		}
		
	} else {
		echo 'Такого пользователя не существует';
	}

?>