<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	if ( !empty( $_POST ) ) {
		$notification_id = $_POST[ 'notificationId' ];
		$current_user = $_POST[ 'userId' ];

		$update_notif = R::load( 'notification', $notification_id );
		$update_notif->readed = -1;
		R::store( $update_notif );

		/*
		$send_notif = R::dispense( 'notification' );

		$send_notif->title 			= $user_from->surname . ' ' . $user_from->name . " прислал запрос";
		$send_notif->text 			= "Пользователь " . $user_from->surname . ' ' . $user_from->name . ' ' . $user_from->middlename . " предложил Вам разделить ответственность за созданный им документ: \"" . $document->title . "\"";
		$send_notif->date_sended  	= date( 'Y-m-d' );
		$send_notif->readed 		= 0;
		$send_notif->document_id  	= $document_id;
		$send_notif->user_from_id 	= $user_from_id;
		$send_notif->user_to_id 	= $user_to_id;

		R::store( $send_notif );
		*/

		echo $current_user;
	}
	else
		echo 'Erorr';

?>