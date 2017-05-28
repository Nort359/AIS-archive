<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/add_record_directory.php';

	$documentType_title = $_POST['data'];
	echo add_record_and_answer('documenttype', $documentType_title);

?>