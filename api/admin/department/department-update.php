<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/update_record_directory.php';

	$department_id 		= $_POST['id'];
	$department_title 	= $_POST['data'];
	$admin_id 			= $_POST['userId'];
	
	$collection = R::findCollection( 'user', 'department_id = ?', [ $department_id ] );

    while( $item = $collection->next() ) {
		$notification = R::dispense( 'notification' );
		
		$notification->title 		= "Ваш отдел переименован";
		$notification->text 		= "Отдел, к которому Вы относитесь был переименован в " . $department_title;
		$notification->date_sended  = date( 'Y-m-d' );
		$notification->readed 		= false;
		$notification->document_id  = 0;
		$notification->user_from_id = $admin_id;
		$notification->user_to_id 	= $item->id;

		R::store( $notification );
    }

	echo update_record_and_answer('department', $department_title, $department_id);

?>