<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	if ( !empty( $_POST ) ) {
		$notification_id = $_POST[ 'notificationId' ];
		$current_user = $_POST[ 'userId' ];

		$update_notif = R::load( 'notification', $notification_id );
		R::trash( $update_notif );

		echo $current_user;
	}
	else
		echo 'Erorr';

?>