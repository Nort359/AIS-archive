<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	
	if ( !empty( $_POST['userId'] ) ) {
		$userId = $_POST['userId'];

		$documents = R::findCollection( 'document', 'users LIKE ?', [ '%' . $userId . '%' ] );

		$docs = array();

		while( $item = $documents->next() ) {
			$creater = substr($item->users, 0, 1);
			$users_count = explode('||', $item->users);

	    	$user = R::findOne( 'user', 'id = ?', [ $creater ] );
	    	
			$docs[] = array(
				'id' 					=> $item->id,
	            'title' 				=> $item->title,
	            'description' 			=> $item->description,
	            'datebegin' 			=> $item->datebegin,
	            'dateend' 				=> $item->dateend,
	            'datesignature' 		=> $item->datesignature,
	            'path' 					=> $item->path,
	            'type_id' 				=> $item->type_id,
	            'users' 				=> $item->users,
	            'document_old' 			=> $item->document_old,
	            'old_id' 				=> $item->old_id,
	            'creater_id' 			=> $user->id,
	            'creater_name' 			=> $user->name,
	            'creater_surname' 		=> $user->surname,
	            'creater_middlename' 	=> $user->middlename,
	            'users_count' 			=> count( $users_count ) - 1

			);
	    }

		if (count( $docs ) > 0)
			echo json_encode($docs);
		else
			echo 'У пользователя ещё нет документов';
	} else {
		echo 'Данные о пользователе не былы переданы';
	}

?>