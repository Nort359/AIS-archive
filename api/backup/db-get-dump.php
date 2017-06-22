<?php

	error_reporting(0);

	require_once 'db-config.php';
	require_once 'db-functions.php';

	$db = connect_db();

	$tables = get_tables($db);

	get_dump($db, $tables);

	echo "Ok";

?>