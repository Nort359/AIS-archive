<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$user_id = $_POST[ 'userId' ];
	$document_id = $_POST[ 'documentId' ];

	$notifications = R::findCollection( 'notification', 'document_id = ? AND user_from_id = ?', [ $document_id, $user_id ] );

	$notification_with_user = array();

    while( $item = $notifications->next() ) {
    	$user = R::findOne( 'user', 'id = ?', [ $item->user_from_id ] );
    	
		$notification_with_user[] = array(
			'id' 					=> $item->id,
			'text' 					=> $item->text,
			'date_sended' 			=> $item->date_sended,
			'user_from_id' 			=> $item->user_from_id,
			'user_to_id' 			=> $item->user_to_id,
			'readed' 				=> $item->readed,
			'user_from_name' 		=> $user->name,
			'user_from_surname' 	=> $user->surname,
			'user_from_middlename' 	=> $user->middlename
		);
    }

	if ( count( $notification_with_user ) > 0 ) {
		echo json_encode( $notification_with_user );
	}
	else
		echo 'Erorr';

?>