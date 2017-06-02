<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$document_title = $_POST['title'];

	if ( R::findOne( 'document', 'title = ?', [ $document_title ] ) > 0 )
		echo 'Error';
	else
		echo 'Ok';

?>