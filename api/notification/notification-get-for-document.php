<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	$document_id = $_POST[ 'documentId' ];

	$notifications = R::findCollection( 'notification', 'document_id = ?', [ $document_id ] );

	$notification_with_user = array();

    while( $item = $notifications->next() ) {
    	$user = R::findOne( 'user', 'id = ?', [ $item->user_from_id ] );
    	
		$notification_with_user[] = array(
			'id' 					=> $item->id,
			'title'					=> $item->title,
			'text' 					=> $item->text,
			'date_sended' 			=> $item->date_sended,
			'document_id' 			=> $item->document_id,
			'user_from_id' 			=> $item->user_from_id,
			'user_to_id' 			=> $item->user_to_id,
			'readed' 				=> $item->readed,
			'user_from_name' 		=> $user->name,
			'user_from_surname' 	=> $user->surname,
			'user_from_middlename' 	=> $user->middlename,
			'user_from_email' 		=> $user->email
		);
    }

	if ( count( $notification_with_user ) > 0 ) {
		echo json_encode( $notification_with_user );
	}
	else
		echo 'Erorr';

?>