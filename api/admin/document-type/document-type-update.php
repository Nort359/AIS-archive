<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/update_record_directory.php';

	$documenttype_id = $_POST['id'];
	$documenttype_title = $_POST['data'];

	echo update_record_and_answer('documenttype', $documenttype_title, $documenttype_id);

?>