<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$email = $_POST['userEmail'];
	$password = $_POST[ 'userPassword' ];

	$user = R::findOne( 'user', 'email = ?', [ $email ] );

	if ($user > 0) {
		if (password_verify($password, $user->password)) {
			setcookie('user_logged', $user, time() + 3600 * 24 * 31 * 3, '/'); // срок действия 3 месяца

			echo json_encode($user);
		} else {
			echo 'Неверный пароль';
		}
		
	} else {
		echo 'Такого пользователя не существует';
	}

?>