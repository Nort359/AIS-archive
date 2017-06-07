<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/update_record_directory.php';

	$department_id = $_POST['id'];
	$department_title = $_POST['data'];
	$admin_id = $_POST['userId'];
	
	$collection = R::findCollection( 'user', 'department_id = ?', [ $department_id ] );

    while( $item = $collection->next() ) {
		$notification = R::dispense( 'notification' );

		$notification->user_from_id = $admin_id;
		$notification->user_to_id 	= $item->id;
		$notification->text 		= "Отдел, к которому Вы относитесь был переименован в " . $department_title;

		R::store( $notification );
    }

	echo update_record_and_answer('department', $department_title, $department_id);

?>