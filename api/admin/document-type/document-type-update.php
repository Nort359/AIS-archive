<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/admin/functions/update_record_directory.php';

	$documenttype_id = $_POST['id'];
	$documenttype_title = $_POST['data'];
	$admin_id = $_POST['userId'];

	$type_docs  = R::findOne( 'documenttype', 'id = ?', [ $documenttype_id ] );
	$collection = R::findCollection( 'user' );

    while( $item = $collection->next() ) {
    	if ( R::findOne( 'document', 'type_id = ? AND user_id = ?', [ $documenttype_id, $item->id ] ) > 0 ) {
    		$notification = R::dispense( 'notification' );

    		$notification->title 		= "Тип документа переименован";
			$notification->text 		= "Тип документа \"" . $type_docs->title . "\", в котором вы храните свои документы был переименован в " . $documenttype_title;
			$notification->date_sended  = date( 'Y-m-d' );
			$notification->readed 		= false;
			$notification->document_id  = 0;
			$notification->user_from_id = $admin_id;
			$notification->user_to_id 	= $item->id;

			R::store( $notification );
    	}
    }

	echo update_record_and_answer('documenttype', $documenttype_title, $documenttype_id);

?>