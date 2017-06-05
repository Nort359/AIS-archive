<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$documenttype_id = $_POST['id'];
	$documenttype = R::findOne( 'documenttype', 'id = ?', [ $documenttype_id ] );

	if ( $documenttype > 0 )
		echo json_encode($documenttype);
	else
		echo 'Error';

?>