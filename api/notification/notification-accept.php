<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	if ( !empty( $_POST ) ) {
		$notification_id = $_POST[ 'notificationId' ];
		$current_user = $_POST[ 'userId' ];

		$notification = R::findOne( 'notification', 'id = ?', [ $notification_id ] );

		$document = R::findOne( 'document', 'id = ?', [ $notification->document_id ] );
		$users_in_document = $document->users . $current_user . '||';

		$update_document = R::load( 'document', $document->id );
		$update_document->users = $users_in_document;
		R::store( $update_document );

		$update_notif = R::load( 'notification', $notification_id );
		$update_notif->readed = 1;
		R::store( $update_notif );

		echo $current_user;
	}
	else
		echo 'Erorr';

?>