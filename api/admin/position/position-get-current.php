<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$position_id = $_POST['id'];
	$position = R::findOne( 'position', 'id = ?', [ $position_id ] );

	if ( $position > 0 )
		echo json_encode($position);
	else
		echo 'Error';

?>