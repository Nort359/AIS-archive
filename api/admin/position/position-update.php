<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/update_record_directory.php';

	$position_id = $_POST['id'];
	$position_title = $_POST['data'];
	$admin_id = $_POST['userId'];

	$collection = R::findCollection( 'user', 'position_id = ?', [ $position_id ] );

    while( $item = $collection->next() ) {
		$notification = R::dispense( 'notification' );

		$notification->title 		= "Ваша должность переименована";
		$notification->text 		= "Должность, к которой Вы относитесь была переименована в " . $position_title;
		$notification->date_sended  = date( 'Y-m-d' );
		$notification->readed 		= false;
		$notification->document_id  = 0;
		$notification->user_from_id = $admin_id;
		$notification->user_to_id 	= $item->id;

		R::store( $notification );
    }

	echo update_record_and_answer('position', $position_title, $position_id);

?>