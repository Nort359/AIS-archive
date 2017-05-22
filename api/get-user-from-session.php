<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	if (!empty($_COOKIE['user_logged'])) {

		$userFromCoockie = (array)json_decode($_COOKIE['user_logged']);

		$userId = $userFromCoockie['id'];
		$userEmail = $userFromCoockie['email'];
		$userPassword = $userFromCoockie['password'];

		$user = R::findOne('user', 'id = ? AND email = ? AND password = ?', [ $userId, $userEmail, $userPassword ]);

		echo $user;

	} else {
		echo 'Таких данных нет';
	}

?>