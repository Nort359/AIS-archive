<?php

	require_once './../libs/rb.php';
	
	// Данные для подключения к базе данных
	define( 'HOST', 'localhost' );
	define( 'USER', 'root' );
	define( 'PASSWORD', '' );
	define( 'DB', 'ais-archive' );

	R::setup( 'mysql:host=' . HOST . ';dbname=' . DB ,
        USER, PASSWORD ); // for both mysql or mariaDB

?>