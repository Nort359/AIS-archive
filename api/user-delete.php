<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	if (!empty($_COOKIE['user_logged'])) {
		setcookie('user_logged', $user, time() - 1, '/');  // удаление куки

		echo 'Ок';
	} else {
		echo 'Таких данных нет';
	}

?>