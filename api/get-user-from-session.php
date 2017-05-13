<?php

	session_start();

	require_once 'config.php';

	if (!empty($_SESSION['userData'])) {
		echo json_encode($_SESSION['userData']);
	} else {
		echo 'Таких данных нет';
	}

?>