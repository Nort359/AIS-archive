<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$document_type = R::findAll( 'documenttype' );

	if ( $document_type > 0 )
		echo json_encode($document_type);
	else
		echo 'Erorr';

?>