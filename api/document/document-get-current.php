<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$document_id = $_POST['id'];
	$document = R::findOne( 'document', 'id = ?', [ $document_id ] );

	if ( $document > 0 )
		echo json_encode($document);
	else
		echo 'Error';

?>