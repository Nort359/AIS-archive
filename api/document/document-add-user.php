<?php
	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	if ( !empty( $_POST ) ) {
		$document_id 	= $_POST[ 'documentId' ];
		$user_from_id 	= $_POST[ 'userFromId' ];
		$user_to_id 	= $_POST[ 'userToId' ];

		$notification 	= R::dispense( 'notification' );

		$notification->title 		= "Запрос от";
		$notification->text 		= "Один из пользователей предложил Вам разделить ответственность за созданный им документ:";
		$notification->date_sended  = date( 'Y-m-d' );
		$notification->readed 		= false;
		$notification->document_id  = $document_id;
		$notification->user_from_id = $user_from_id;
		$notification->user_to_id 	= $user_to_id;

		R::store( $notification );

		echo "Ok";
	} else
		echo 'Error';

?>