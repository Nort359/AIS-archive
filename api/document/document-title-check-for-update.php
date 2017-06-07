<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$document_title = $_POST['title'];
	$user_id = $_POST[ 'userId' ];

	$document = R::findOne( 'document', 'title = ? AND user_id = ?', [ $document_title, $user_id ] );

	$current_document_id = $_POST[ 'currentDocument' ];

	if ( $document->document_old == 1 && $document->old_id === $current_document_id ) {
		echo 'Ok';
	} else {
		if ($document > 0)
			echo 'Error';
		else
			echo 'Ok';
	}

?>