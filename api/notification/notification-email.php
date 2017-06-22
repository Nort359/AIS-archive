<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	$documents = R::findCollection( 'document' );

	while ( $document = $documents->next() ) {
		if ( date( $document->dateend ) < date( "Y-m-d", ( time() + 3600 * 24 * 10 ) ) ) {
			$users_ids = explode( '||', $document->users );

			$users = R::findCollection( 'user', 'id IN (' . R::genSlots( $users_ids ) . ')', $users_ids );

			$users_sended = '';

			if ( $document->email_sended != 1 ) {

				while ( $user = $users->next() ) {
					$notification = R::dispense( 'notification' );

					$notification->title 		= "Дата пересмотра документа близка";
					$notification->text 		= "До даты пересмотра Вашего документа — \"" . $document->title . "\" осталось  меньше 10 дней! Вам нужно срочно пересмотреть этот документ";
					$notification->date_sended  = date( 'Y-m-d' );
					$notification->readed 		= 3;
					$notification->user_from_id = $users_ids[0];
					$notification->user_to_id 	= $user->id;

					R::store( $notification );
				}

			
				$doc = R::load( 'document', $document->id );
				$doc->email_sended = 1;
				R::store( $doc );
			}

		}
	}

	echo 'Ok';

?>