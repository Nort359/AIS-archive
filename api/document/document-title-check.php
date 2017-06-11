<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$document_title = $_POST['title'];
	$user_id = $_POST[ 'userId' ];

	if ( R::findOne( 'document', 'title = ? AND users LIKE ?', [ $document_title, '%' . $user_id . '%' ] ) > 0 )
		echo 'Error';
	else
		echo 'Ok';

?>