<?php

	error_reporting(0);

	require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config.php';
	
	$users = R::findCollection( 'user' );

	$array_users = array();

	while( $user = $users->next() ) {
		$user_department = R::findOne( 'department', 'id = ?', [ $user->department_id ] );
		$user_position   = R::findOne( 'position', 'id = ?', [ $user->position_id ] );

		$array_users[] = array(
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
    }

	if ($users > 0)
		echo json_encode($array_users);
	else
		echo 'Error';

?>