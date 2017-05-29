<?php

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';

	if (!empty($_COOKIE['user_logged'])) {

		$userFromCoockie = unserialize($_COOKIE['user_logged']);

		$userId = $userFromCoockie['id'];
		$userEmail = $userFromCoockie['email'];
		$userPassword = $userFromCoockie['password'];

		$user = R::findOne('user', 'id = ? AND email = ? AND password = ?', [ $userId, $userEmail, $userPassword ]);

		$user_department = R::findOne( 'department', 'id = ?', [ $user->department_id ] );
		$user_position   = R::findOne( 'position', 'id = ?', [ $user->position_id ] );

		$user_with_depart = array(
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

		echo json_encode( $user_with_depart );

	} else {
		echo 'Таких данных нет';
	}

?>