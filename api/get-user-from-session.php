<?php

	require_once 'config.php';

	if (!empty($_COOKIE['user_logged'])) {
		$user = $_COOKIE['user_logged'];

		echo $user;
	} else {
		echo 'Таких данных нет';
	}

?>