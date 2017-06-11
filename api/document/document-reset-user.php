<?php
	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	if ( !empty( $_POST ) ) {
		$document_id 	= $_POST[ 'documentId' ];
		$user_from_id 	= $_POST[ 'userFromId' ];
		$user_to_id 	= $_POST[ 'userToId' ];

		$notification = R::findOne( 'notification', 'document_id = ? AND user_to_id = ?', [ $document_id, $user_to_id ] );

		$record = R::load( 'notification', $notification->id );

		R::trash( $record );

		echo $document_id;
	} else
		echo 'Error';

?>