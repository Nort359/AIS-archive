<?php

	require_once 'config.php';

	if (!empty($_COOKIE['user_logged'])) {
		setcookie('user_logged', $user, time() - 1, '/');  // удаление куки

		echo 'Ок';
	} else {
		echo 'Таких данных нет';
	}

?>