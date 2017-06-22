<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	
	if ( !empty( $_POST['userId'] ) ) {
		$userId = $_POST['userId'];

		$findUser = R::findOne( 'user', 'id = ?', [ $userId ] );

		$userDepartments = R::findCollection( 'user', 'department_id = ?', [ $findUser->department_id ] );

		$usersWithDocs = array();

		$i = 0;

		while( $user = $userDepartments->next() ) {
			$documents = R::findCollection( 'document', 'users LIKE ?', [ '%' . $user->id . '%' ] );

			$user_department = R::findOne( 'department', 'id = ?', [ $user->department_id ] );
			$user_position   = R::findOne( 'position', 'id = ?', [ $user->position_id ] );

			$usersWithDocs[] = array(
				'id' 			=> $user->id,
				'name' 			=> $user->name,
				'surname' 		=> $user->surname,
				'middlename' 	=> $user->middlename,
				'photo' 		=> $user->photo,
				'email' 		=> $user->email,
				'password' 		=> $user->password,
				'department_id' => $user->department_id,
				'position_id' 	=> $user->position_id,
				'admin' 		=> $user->admin,
				'department' 	=> $user_department->title,
				'position'   	=> $user_position->title
			);

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

		    $usersWithDocs[ $i ][ 'documents' ] = $docs;

		    $i++;
		}

		if (count( $usersWithDocs ) > 0)
			echo json_encode( $usersWithDocs );
		else
			echo 'У пользователя ещё нет документов';
	} else {
		echo 'Данные о пользователе не былы переданы';
	}

?>