<?php
	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	if ( !empty( $_POST ) ) {
		$document_id 	= $_POST[ 'documentId' ];
		$user_from_id 	= $_POST[ 'userFromId' ];
		$user_to_id 	= $_POST[ 'userToId' ];

		$user_from = R::findOne( 'user', 'id = ?', [ $user_from_id ] );
		$document = R::findOne( 'document', 'id = ?', [ $document_id ] );

		$notification 	= R::dispense( 'notification' );

		$notification->title 		= $user_from->surname . ' ' . $user_from->name . " прислал запрос";
		$notification->text 		= "Пользователь " . $user_from->surname . ' ' . $user_from->name . ' ' . $user_from->middlename . " предложил Вам разделить ответственность за созданный им документ: \"" . $document->title . "\"";
		$notification->date_sended  = date( 'Y-m-d' );
		$notification->readed 		= 0;
		$notification->document_id  = $document_id;
		$notification->user_from_id = $user_from_id;
		$notification->user_to_id 	= $user_to_id;

		R::store( $notification );

		echo $document_id;
	} else
		echo 'Error';

?>