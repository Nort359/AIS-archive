<?php

	require_once 'db-config.php';
	require_once 'db-functions.php';
	require_once 'db-creater.php';

	$db = connect_db();

	$tables = get_tables($db);

	import_dump_db($db);
?>