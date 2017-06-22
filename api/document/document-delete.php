<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/functions/translit.php';

	if ( !empty( $_POST ) ) {
		$doc_id 	= $_POST[ 'id' ];
		$user_id 	= $_POST[ 'userId' ];

		$document = R::findOne( 'document', 'id = ?', [ $doc_id ] );

		$users_ids = explode( '||', $document->users );

		$user = R::findOne( 'user', 'id = ?', [ $user_id ] );

		$users = R::findCollection( 'user', 'id IN (' . R::genSlots( $users_ids ) . ')', $users_ids );

		while ( $us = $users->next() ) {
			if ( $us->id != $user_id ) {
				$notification = R::dispense( 'notification' );

	    		$notification->title 		= "Документ был удалён";
				$notification->text 		= "Документ — \"" . $document->title . "\", за который Вы несли ответственность был удалён пользователем " . $user->surname . ' ' . $user->name . ' ' . $user->middlename;
				$notification->date_sended  = date( 'Y-m-d' );
				$notification->readed 		= 3;
				$notification->user_from_id = $user->id;
				$notification->user_to_id 	= $us->id;

				R::store( $notification );
			}
		}
		
		$old_docs = R::findCollection( 'document', 'old_id = ?', [ $document->id ] );

		while ( $doc = $old_docs->next() ) {
			$document_up = R::load( 'document', $doc->id );
			R::trash( $document_up );
		}

		$document_update = R::load( 'document', $doc_id );
		R::trash( $document_update );

		echo 'Ok';
	} else
		echo 'Данные не были переданы';

?>