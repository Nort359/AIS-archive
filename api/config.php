<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/libs/rb.php';
	
	// Данные для подключения к базе данных
	define( 'HOST', 'localhost' );
	define( 'USER', 'root' );
	define( 'PASSWORD', '' );
	define( 'DB', 'ais_archive' );

	R::setup( 'mysql:host=' . HOST . ';dbname=' . DB ,
        USER, PASSWORD ); // for both mysql or mariaDB

?>