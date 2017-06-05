<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/delete_record_directory.php';

	$document_type_id = $_POST['typeDocumentId'];

	if ( delete_current_record( 'documenttype', $document_type_id ) )
		echo 'Ok';
	else
		echo 'Error';

?>