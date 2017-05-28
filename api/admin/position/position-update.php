<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/update_record_directory.php';

	$position_id = $_POST['id'];
	$position_title = $_POST['data'];

	echo update_record_and_answer('position', $position_title, $position_id);

?>