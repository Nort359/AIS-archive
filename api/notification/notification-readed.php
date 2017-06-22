<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	if ( !empty( $_POST ) ) {
		$notification_id = $_POST[ 'notificationId' ];
		$current_user = $_POST[ 'userId' ];

		$notif = R::findOne( 'notification', 'id = ?', [ $notification_id ] );

		if ( $notif->readed == 3 ) {
			$update_notif = R::load( 'notification', $notification_id );
			$update_notif->readed = 2;
			R::store( $update_notif );
		}

		echo $current_user;
	}
	else
		echo 'Erorr';

?>