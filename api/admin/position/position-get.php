<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$position = R::findAll( 'position' );

	if ( $position > 0 )
		echo json_encode($position);
	else
		echo 'Erorr';

?>