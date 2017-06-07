<?php

	require_once 'db-config.php';

	$mysqli = new mysqli(HOST, USER, PASSWORD);

	/*
	 * Это "официальный" объектно-ориентированный способ сделать это
	 * однако $connect_error не работал вплоть до версий PHP 5.2.9 и 5.3.0.
	 */
	if ($mysqli->connect_error) {
	    die('Ошибка подключения (' . $mysqli->connect_errno . ') '
	            . $mysqli->connect_error);
	}

	$mysqli_result = $mysqli->query( "SHOW DATABASES" );

	$is_db = FALSE;

	/* извлечение ассоциативного массива */
    while ($row = $mysqli_result->fetch_array(MYSQLI_NUM)) {
    	if ( $row[0] === DB ) $is_db = TRUE;
    }

    if ( $is_db === TRUE ) {
    	echo "Ok";
    } else {
    	echo "Error";
    }

?>